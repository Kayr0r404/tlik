import requests
from flask import Flask, jsonify
from models.engine.db_storage import DBStorage
from sqlalchemy.ext.declarative import DeclarativeMeta
import json

app = Flask(__name__)

# Initialize the storage once
storage = DBStorage()
storage.reload()


def to_dict(obj):
    """Convert SQLAlchemy model instance into dictionary, excluding certain keys."""
    # List of keys to exclude
    exclude_keys = {"category", "registry"}

    if isinstance(obj.__class__, DeclarativeMeta):
        fields = {}
        for field in [x for x in dir(obj) if not x.startswith("_") and x != "metadata"]:
            # Skip excluded keys
            if field in exclude_keys:
                continue

            data = obj.__getattribute__(field)
            try:
                # This will raise TypeError if the value is not JSON serializable
                json.dumps(data)
                fields[field] = data
            except TypeError:
                fields[field] = str(data)

        return fields


@app.route("/Home", strict_slashes=False, methods=["GET", "POST"])
def Home():
    # Retrieve all Product objects from the database
    data = storage.all("Product")

    # Debug: Print the retrieved data to the console
    print(data)

    # Convert each Product object to a dictionary for JSON serialization
    data_dict = [to_dict(value) for value in data]

    # Return the dictionary of Product objects as a JSON response
    return jsonify(data_dict)


url = "https://fakestoreapi.com/products/category/"


@app.get("/Mens", strict_slashes=False)
def mens():
    response = requests.get(f"{url}men's%20clothing")
    return response.json()


@app.route("/Women")
def Women():
    response = requests.get(f"{url}women's%20clothing")
    return jsonify(response.json())


@app.route("/", strict_slashes=False)
def root():
    return "<h1> Welcome to my backend... </h1>"


if __name__ == "__main__":
    app.run(debug=True)
