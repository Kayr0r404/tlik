#!/usr/bin/env python3
from api.v1.views import app_views_bp, session, storage
from models.order import Order
from models.order_items import OrderItems
from flask import jsonify
from sqlalchemy import asc
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)


@app_views_bp.route("/orders", methods=["GET"], strict_slashes=False)
@jwt_required()
def get_orders():
    user_identity = get_jwt_identity()
    user_orders = (
        session.query(Order)
        .filter_by(user_id=user_identity["id"])
        .order_by(Order.created_at.asc())  # Order by date in descending order
        .all()
    )

    if not user_orders:
        return jsonify({"message": "No orders found"}), 404

    orders_list = []
    for order in user_orders:
        order_data = {
            "order_number": order.to_dict().get("order_number"),
            "date": order.to_dict().get("created_at"),
            "order_status": order.to_dict().get("order_status"),
            "total": order.to_dict().get("total_amount"),
        }
        orders_list.append(order_data)

    return jsonify(orders_list), 200


@app_views_bp.route("/get-order/<order_number>", strict_slashes=False, methods=["GET"])
@jwt_required()
def get_order(order_number):
    user_identity = get_jwt_identity()

    # Retrieve the specified order for the current user
    order = (
        session.query(Order)
        .filter_by(user_id=user_identity["id"], order_number=order_number)
        .first()
    )

    # If no order is found, return a 404 response
    if not order:
        return jsonify({"msg": "Could not find the order number"}), 404

    # Retrieve all items in the order table
    order_items = (
        session.query(OrderItems).filter_by(order_id=order.to_dict()["id"]).all()
    )

    # Prepare order details for the response
    order_details = []
    for product in order_items:
        product_dict = product.to_dict()
        product_data = {
            "product": product_dict["title"],
            "price": product_dict["price"],
            "quantity": product_dict["quantity"],
        }
        order_details.append(product_data)

    print(order_details)

    return jsonify(order_details), 200
