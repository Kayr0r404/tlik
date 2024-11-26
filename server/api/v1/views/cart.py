from api.v1.views import app_views_bp, session, storage
from models.cart_items import CartItem
from models.products import Product
from models.user import User
from flask import jsonify, request, abort
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)


@app_views_bp.route("/cart", methods=["GET"])
@jwt_required()
def get_cart():
    user_identity = get_jwt_identity()  # Retrieves the user's identity from the JWT
    cart_items = (
        session.query(CartItem).filter_by(user_id=user_identity["id"]).all()
    )  # Fetch all items in the cart for the user

    if cart_items:
        cart_data = [
            item.to_dict() for item in cart_items
        ]  # Convert each item to a dictionary
        # product = session.query(Product).filter_by(id=cart_items["id"]).all()
        return jsonify(cart_data), 200
    else:
        return jsonify({"message": "Cart is empty"}), 201


@app_views_bp.route("/cart", methods=["POST"])
@jwt_required()
def add_to_cart():
    user_identity = get_jwt_identity()
    items_to_add = request.get_json()

    if len(items_to_add) == 0:
        return (
            jsonify({"msg": "Cart is Empty, server cannot create cart for the user"}),
            300,
        )

    # Fetch the user from the database using the user ID
    user = session.query(User).filter_by(id=user_identity["id"]).first()
    # Query all cart items for the authenticated user
    if not user:
        return jsonify({"error": "User not found"}), 404

    # user_cart_exist = session.query(CartItem).filter_by(user_id=user.id)

    added_items = []

    try:
        for item in items_to_add:
            product = session.query(Product).filter_by(id=item["id"]).first()

            # Ensure the product exists before adding to cart
            if not product:
                return (
                    jsonify({"error": f"Product with id {item['id']} not found"}),
                    404,
                )
            cart_item = (
                session.query(CartItem)
                .filter_by(user_id=user_identity["id"], product_id=item["id"])
                .first()
            )

            # if item already in cart increase quantity else add it
            if cart_item:
                cart_item.quantity += item["quantity"]
            else:

                # Create a new CartItem object and add it to the session
                cart_item = CartItem(
                    quantity=item["quantity"], product=product, user=user
                )
                storage.new(cart_item)
                added_items.append(
                    {"product_id": product.id, "quantity": item["quantity"]}
                )

        # Commit the changes to the database
        storage.save()

        # Return the added items as a response
        return jsonify({"message": "Items added to cart", "items": added_items}), 200

    except Exception as e:
        storage.rollback()
        return (
            jsonify(
                {
                    "error": "An error occurred while adding to the cart",
                    "details": str(e),
                }
            ),
            500,
        )


@app_views_bp.route("/cart/<product_id>", methods=["PUT"])
@jwt_required()
def update_cart(product_id):
    user_identity = get_jwt_identity()

    # Fetch the cart item based on product_id and user_id
    cart_item = (
        session.query(CartItem)
        .filter_by(product_id=product_id, user_id=user_identity["id"])
        .first()
    )

    if not cart_item:
        return jsonify({"error": "Cart item not found"}), 404

    # Get the new quantity from the request body
    data = request.get_json()
    new_quantity = data.get("quantity")

    # Check if the quantity is valid (e.g., positive integer)
    if new_quantity is None or new_quantity <= 0:
        return jsonify({"error": "Invalid quantity"}), 400

    # Update the quantity
    cart_item.quantity = new_quantity

    try:
        # Commit the changes to the database
        storage.save()
        return (
            jsonify(
                {
                    "cart_item": {
                        "product_id": cart_item.product_id,
                        "quantity": cart_item.quantity,
                        "user_id": cart_item.user_id,
                    }
                }
            ),
            200,
        )
    except Exception as e:
        session.rollback()  # Rollback the session in case of an error
        return jsonify({"error": str(e)}), 500


@app_views_bp.route("/delete-cart", strict_slashes=False, methods=["DELETE"])
@jwt_required()
def delete_cart():
    user_identity = get_jwt_identity()

    try:
        # Query all cart items for the authenticated user
        cart_items = (
            session.query(CartItem).filter_by(user_id=user_identity["id"]).all()
        )

        if not cart_items:
            return jsonify({"msg": "No items in the cart to delete"}), 404

        # Delete each cart item
        for item in cart_items:
            session.delete(item)  # Properly delete from the session

        storage.save()  # Commit the transaction to persist the changes

        return jsonify({"msg": "Cart deleted successfully"}), 200

    except Exception as e:
        session.rollback()  # Rollback in case of any error
        return jsonify({"error": str(e)}), 500


@app_views_bp.route("/cart/<product_id>", methods=["DELETE"])
@jwt_required()
def delete_product_in_cart(product_id):
    user_identity = get_jwt_identity()  # Get the logged-in user's information

    try:
        # Query the cart item by both cart_id and the item id
        cart_item = (
            session.query(CartItem)
            .filter_by(product_id=product_id, user_id=user_identity["id"])
            .first()
        )

        if not cart_item:
            return jsonify({"error": "Cart item not found"}), 404

        # Delete the cart item from the session
        storage.delete(cart_item)

        # Commit the changes to the database
        storage.save()

        return jsonify({"message": "Cart item deleted successfully"}), 200

    except Exception as e:
        session.rollback()  # Rollback in case of an error
        return jsonify({"error": str(e)}), 500
