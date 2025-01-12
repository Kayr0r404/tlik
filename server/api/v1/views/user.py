from flask import request, abort, jsonify
from models.user import User
from models.engine.db_storage import DBStorage
from api.v1.views import app_views_bp
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    jwt_required,
)
from datetime import datetime


# Initialize Bcrypt and DBStorage
bcrypt = Bcrypt()
storage = DBStorage()
storage.reload()
session = storage._DBStorage__session


@app_views_bp.route("/login", methods=["POST"])
def login():
    # Retrieve user credentials
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    # Query user from the database
    user = session.query(User).filter_by(email=email).first()

    # Check if user exists and the password is correct
    if user is None or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized user"}), 401

    # Create JWT token for the user
    access_token = create_access_token(
        identity={
            "first_name": user.first_name,
            "email": user.email,
            "id": user.id,
            "last_name": user.last_name,
        }
    )
    token_creation_time = datetime.now()

    return (
        jsonify(
            {
                "access_token": access_token,
                "user_data": {
                    "user_id": user.id,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "email": user.email,
                },
                "token_creation_time": token_creation_time,
            }
        ),
        200,
    )


@app_views_bp.route("/register", methods=["POST"])
def register_user():
    # Get user data from request
    data = request.get_json()

    # Check if user already exists
    user_exist = session.query(User).filter_by(email=data["email"]).first()
    if user_exist:
        return jsonify({"error": "User already exists"}), 422

    # Hash the user's password
    hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")

    # Create new user object
    user = User(
        first_name=data["first_name"],
        last_name=data["last_name"],
        email=data["email"],
        password=hashed_password,
    )

    # Save the new user to the database
    storage.new(user)
    storage.save()

    # Automatically log in the user after successful registration
    access_token = create_access_token(
        identity={"first_name": user.first_name, "email": user.email, "id": user.id}
    )

    return (
        jsonify(
            {
                "access_token": access_token,
                "user_data": {
                    "user_id": user.id,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "email": user.email,
                },
            }
        ),
        200,
    )


@app_views_bp.route("/reset-password-link", methods=["GET"], strict_slashes=False)
@jwt_required()
def reset_password_link():
    user_identity = get_jwt_identity()
    user_email = request.get_json()

    # verify if email exits in db
    user = (
        session.query(User).filter_by(id=user_identity["id"], email=user_email).first()
    )

    if not user:
        return jsonify({"error": "Email does not exist"}), 401

    return jsonify({"msg": "user verified"}), 200


@app_views_bp.route("/reset-password", methods=["POST"], strict_slashes=False)
@jwt_required()
def reset_password():
    user_identity = get_jwt_identity()
    user_email = request.get_json()

    # verify if email exits in db
    user = (
        session.query(User).filter_by(id=user_identity["id"], email=user_email).first()
    )

    if not user:
        return jsonify({"error": "Email does not exist"}), 404

    return jsonify({"msg": "user verified"}), 200


@app_views_bp.route("/refresh", methods=["POST"], strict_slashes=False)
@jwt_required(refresh=True)
def refresh_token():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity, fresh=False)
    return jsonify(access_token=access_token)


# Initialize Bcrypt with the application (ensure app instance has been passed)
def initialize_bcrypt(app):
    bcrypt.init_app(app)
