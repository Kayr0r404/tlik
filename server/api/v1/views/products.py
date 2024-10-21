from api.v1.views import app_views_bp
from api.v1.views import storage, session
from models.products import Product
from flask import jsonify


@app_views_bp.route("/products", strict_slashes=False, methods=["GET", "POST"])
def get_products():
    # Retrieve all Product objects from the database
    data = storage.all("Product")

    # Debug: Print the retrieved data to the console
    print(data)

    # Convert each Product object to a dictionary for JSON serialization
    data_dict = [value.to_dict() for value in data]

    # Return the dictionary of Product objects as a JSON response
    return jsonify(data_dict)


@app_views_bp.route("/products/<product_id>", strict_slashes=False, methods=["GET"])
def get_product_by_id(product_id):
    product = session.query(Product).filter_by(id=product_id).first()
    return jsonify(
        {
            "title": product.title,
            "description": product.description,
            "image": product.image,
            "price": product.price,
            "quantity": product.quantity,
            "id": product.id,
        }
    )


@app_views_bp.get("/Mens", strict_slashes=False)
def mens():
    data = [value.to_dict() for value in storage.all("Product")]

    # Filter the data to include only men's clothing
    mens_clothing = [
        (product)
        for product in data
        if product.get("category_name") == "men's clothing"
    ]

    return jsonify(mens_clothing)


@app_views_bp.get("/Women")
def Women():
    data = [value.to_dict() for value in storage.all("Product")]

    # Filter the data to include only women's clothing
    womens_clothing = [
        (product)
        for product in data
        if product.get("category_name") == "women's clothing"
    ]

    return jsonify(womens_clothing)
