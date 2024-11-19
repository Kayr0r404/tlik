from api.v1.views import app_views_bp, session, storage
from models.user import User
from models.user_address import UserAddres
from flask import jsonify, request, abort
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)


@app_views_bp.route("/get-address", strict_slashes=False, methods=["GET"])
@jwt_required()
def get_user_addresses():
    user_identity = get_jwt_identity()
    user_adresses = (
        session.query(UserAddres).filter_by(user_id=user_identity["id"]).first()
    )

    if user_adresses:
        return jsonify(
            {
                "full_address": user_adresses.to_dict(),
                "contact": {
                    "email": user_identity["email"],
                    "phone": user_adresses.to_dict()["phone"],
                },
                "address": f'{user_adresses.to_dict()["address"]}, {user_adresses.to_dict()["suburb"]}, {user_adresses.to_dict()["city"]}, {user_adresses.to_dict()["province"]}, {user_adresses.to_dict()["postal_code"]}',
            }
        )

    print(user_adresses)

    return jsonify(user_adresses), 404


@app_views_bp.route("/post-address", strict_slashes=False, methods=["POST"])
@jwt_required()
def post_user_aaddress():
    user_identity = get_jwt_identity()
    address_data = request.get_json()
    user = session.query(User).filter_by(id=user_identity["id"]).first()
    if not user:
        abort, 404
    user_address = UserAddres(
        user=user,
        first_name=address_data["firstName"],
        last_name=address_data["lastName"],
        phone=address_data["phoneNumber"],
        address=address_data["address"],
        suburb=address_data["suburb"],
        city=address_data["city"],
        province=address_data["province"],
        postal_code=address_data["postalCode"],
    )

    storage.new(user_address)
    storage.save()

    return jsonify(
        {
            "contact": {
                "email": user_identity["email"],
                "phone": address_data["phoneNumber"],
            },
            "address": f'{address_data["address"]}, {address_data["suburb"]}, {address_data["city"]}, {address_data["province"]}, {address_data["postalCode"]}',
        }
    )


@app_views_bp.route(
    "/update-address/<address_id>", strict_slashes=False, methods=["PUT"]
)
@jwt_required()
def update_user_address(address_id):
    user_identity = get_jwt_identity()
    address_data = request.get_json()

    # Query for the user's address based on user ID and address ID
    address = (
        session.query(UserAddres)
        .filter_by(id=address_id, user_id=user_identity["id"])
        .first()
    )

    if not address:
        return jsonify({"error": "Address not found"}), 404

    # Update address fields if they exist in the incoming request data
    for key, val in address_data.items():
        # Dynamically update only fields that exist on the 'address' model
        if hasattr(address, key):
            current_value = getattr(address, key)
            if val != current_value:  # Only update if there's a difference
                setattr(address, key, val)

    # Save the updated address in the database
    storage.save()

    # Return updated address information
    return jsonify(
        {
            "contact": {
                "email": user_identity["email"],
                "phone": address_data.get("phoneNumber", address.phone),
            },
            "address": f'{address_data.get("address", address.address)}, '
            f'{address_data.get("suburb", address.suburb)}, '
            f'{address_data.get("city", address.city)}, '
            f'{address_data.get("province", address.province)}, '
            f'{address_data.get("postalCode", address.postal_code)}',
        }
    )


@app_views_bp.route("/address/<address_id>", strict_slashes=False, methods=["DELETE"])
@jwt_required()
def delete_address(address_id):
    user_identity = get_jwt_identity()
