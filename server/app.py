from flask import Flask
from api.v1.views.user import initialize_bcrypt
from api.v1.views import app_views_bp
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from datetime import timedelta
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
initialize_bcrypt(app)
jwt = JWTManager(app)
CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(app_views_bp)


@app.route("/", strict_slashes=False)
def root():
    return "<h1> Welcome to my backend... </h1>"


if __name__ == "__main__":
    app.run(port=5001, debug=True)
