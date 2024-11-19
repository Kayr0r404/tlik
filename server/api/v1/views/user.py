from flask import request, abort, jsonify
from models.user import User
from models.engine.db_storage import DBStorage
from api.v1.views import app_views_bp
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    create_access_token,
)


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


@app_views_bp.route("/register", methods=["POST"])
def register_user():
    # Get user data from request
    data = request.get_json()

    # Check if user already exists
    user_exist = session.query(User).filter_by(email=data["email"]).first()
    if user_exist:
        return jsonify({"error": "User already exists"}), 409

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


# Initialize Bcrypt with the application (ensure app instance has been passed)
def initialize_bcrypt(app):
    bcrypt.init_app(app)
