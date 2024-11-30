#!/bash/python3
from api.v1.views import session, storage
from models.products import Product
from models.user import User
from models.wishlist import Wishlist
from api.v1.views import app_views_bp
from flask import request, jsonify
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)


@app_views_bp.route("/get-wishlist", methods=["GET"], strict_slashes=False)
@jwt_required()
def get_wishlist():
    user_identity = get_jwt_identity()
    user_wishlist = session.query(Wishlist).filter_by(user_id=user_identity["id"]).all()

    if user_wishlist:
        wishlist_data = [data.to_dict() for data in user_wishlist]
        return jsonify(wishlist_data), 200
    return jsonify({"msg": "No wishlist found for this user"}), 404


@app_views_bp.route("/add-wishlist", methods=["POST"], strict_slashes=False)
@jwt_required()
def add_wishlist():
    user_identity = get_jwt_identity()
    wishlist = request.get_json()

    user = session.query(User).filter_by(id=user_identity["id"]).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    for item in wishlist:
        # check if item alreay in users' wishlist
        item_already_in_wishlist = (
            session.query(Wishlist)
            .filter_by(user_id=user_identity["id"], product_id=item["id"])
            .first()
        )
        if item_already_in_wishlist:
            continue
        product = session.query(Product).filter_by(id=item["id"]).one()
        if not product:
            return (
                jsonify({"msg": f"Product with this id: {item['id']} is not Found"}),
                404,
            )

        add_wishlist_item = Wishlist(
            product=product,
            user=user,
            product_id=item["id"],
            user_id=user_identity["id"],
            quantity=1,
        )

        storage.new(add_wishlist_item)

    storage.save()

    return jsonify({"msg": "Succesfully added wishlist items"})


@app_views_bp.route("/clear-wishlist", methods=["DELETE"], strict_slashes=False)
@jwt_required()
def clear_wishlist():
    user_identity = get_jwt_identity()
    user_wishlist = session.query(Wishlist).filter_by(user_id=user_identity["id"]).all()

    if not user_wishlist:
        return jsonify({"error": "Wishlist for user NO FOUND"}), 404

    for item in user_wishlist:
        storage.delete(item)
    storage.save()

    return jsonify({"msg": "succesfully cleared users' wishlist"}), 200


@app_views_bp.route(
    "/remove-item-wishlist/<string:product_id>",
    methods=["DELETE"],
    strict_slashes=False,
)
@jwt_required()
def remove_item_from_wishlist(product_id):
    user_identity = get_jwt_identity()

    wishlist_item = (
        session.query(Wishlist)
        .filter_by(product_id=product_id, user_id=user_identity["id"])
        .first()
    )

    if not wishlist_item:
        return jsonify({"error": "item not found in user's wishlist"}), 404

    storage.delete(wishlist_item)
    storage.save()

    return jsonify({"msg": "item removed form wishlist"}), 200
