from flask import Flask
from api.v1.views.user import initialize_bcrypt
from api.v1.views import app_views_bp
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from datetime import timedelta

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "your_jwt_secret_key"  # Change this in production!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=24)
initialize_bcrypt(app)
jwt = JWTManager(app)
# app.register_blueprint(app_views)
CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(app_views_bp)


@app.route("/", strict_slashes=False)
def root():
    return "<h1> Welcome to my backend... </h1>"


if __name__ == "__main__":
    app.run(port=5001, debug=True)
