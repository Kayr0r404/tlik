from api.v1.views import app_views_bp
from api.v1.views import storage, session
from models.products import Product
from flask import jsonify, request


@app_views_bp.route("/products", strict_slashes=False, methods=["GET", "POST"])
def get_products():
    # Retrieve all Product objects from the database
    data = storage.all("Product")

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


from flask import jsonify
from math import ceil


@app_views_bp.get("/Mens", strict_slashes=False)
def mens(page=1, per_page=12):
    page = request.args.get("page", default=1, type=int)
    per_page = request.args.get("per_page", default=12, type=int)
    # Fetch all products and filter for men's clothing
    data = [value.to_dict() for value in storage.all("Product")]
    mens_clothing = [
        product for product in data if product.get("category_name") == "mans"
    ]

    # Calculate total items and total pages for pagination
    total = len(mens_clothing)
    total_pages = ceil(total / per_page)

    # Get paginated items for the current page
    start = (page - 1) * per_page
    end = start + per_page
    paginated_data = mens_clothing[start:end]

    # Return paginated result with metadata
    return jsonify(
        {
            "page": page,
            "per_page": per_page,
            "total": total,
            "total_pages": total_pages,
            "page_list": [i for i in range(1, total_pages + 1)],
            "mans_watches": paginated_data,
        }
    )


@app_views_bp.get("/home_and_living", strict_slashes=False)
def home_and_living():
    data = [value.to_dict() for value in storage.all("Product")]

    # Filter the data to include only men's clothing
    mens_clothing = [
        (product)
        for product in data
        if product.get("category_name") == "home-and-living"
    ]

    return jsonify(mens_clothing)


@app_views_bp.get("/Women")
def Women(page=1, per_page=12):
    page = request.args.get("page", default=1, type=int)
    per_page = request.args.get("per_page", default=12, type=int)
    # Fetch all products and filter for men's clothing
    data = [value.to_dict() for value in storage.all("Product")]
    mens_clothing = [
        product for product in data if product.get("category_name") == "ladies"
    ]

    # Calculate total items and total pages for pagination
    total = len(mens_clothing)
    total_pages = ceil(total / per_page)

    # Get paginated items for the current page
    start = (page - 1) * per_page
    end = start + per_page
    paginated_data = mens_clothing[start:end]

    # Return paginated result with metadata
    return jsonify(
        {
            "page": page,
            "per_page": per_page,
            "total": total,
            "total_pages": total_pages,
            "page_list": [i for i in range(1, total_pages + 1)],
            "mans_watches": paginated_data,
        }
    )
