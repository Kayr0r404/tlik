#!/usr/bin/env python3
from api.v1.views import app_views_bp, session, storage
from models.order_items import OrderItems
from models.cart_items import CartItem
from models.products import Product
from models.order import Order
from flask import request, jsonify, make_response
import stripe, os, json
from dotenv import load_dotenv
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

load_dotenv()

stripe.api_key = os.getenv("STRIPE_API_KEY")
web_hook_secret_key = os.getenv("WEB_HOOK_SECRETE_KEY")


@app_views_bp.route("/create-checkout-session", methods=["POST"])
@jwt_required()
def create_checkout_session():
    user_identity = get_jwt_identity()
    cart_item = request.get_json()
    _line_items = []
    for item in cart_item:
        _dict = {
            "price_data": {
                "currency": "zar",
                "product_data": {"name": item["title"], "images": [item["image"]]},
                "unit_amount": int(100 * item["price"]),
            },
            "quantity": item["quantity"],
            # "id": item["id"],
        }
        _line_items.append(_dict)

    try:
        customer = stripe.Customer.create(
            email=user_identity["email"],
            metadata={
                "user_id": user_identity["id"],
            },
        )
        checkout_session = stripe.checkout.Session.create(
            customer=customer.id,
            line_items=_line_items,
            payment_method_types=["card"],
            mode="payment",
            success_url="http://localhost:3000/success?success=true",
            cancel_url="http://localhost:3000/cart?canceled=true",
        )
    except Exception as e:
        return jsonify(error=str(e)), 500

    return jsonify({"url": checkout_session.url})


@app_views_bp.route("/webhook", methods=["POST"])
def webhook():
    payload = request.data
    sig_header = request.headers.get("stripe-signature")
    event = None

    try:
        if web_hook_secret_key:
            event = stripe.Webhook.construct_event(
                payload, sig_header, web_hook_secret_key
            )
        else:
            event = json.loads(payload)
    except (ValueError, stripe.error.SignatureVerificationError) as e:
        print("⚠️  Webhook error:", e)
        return jsonify(success=False), 400

    if event["type"] == "checkout.session.completed":
        session_object = event["data"]["object"]

        # Retrieve customer and cart information
        customer = stripe.Customer.retrieve(session_object["customer"])
        user_id = customer["metadata"]["user_id"]

        # Retrieve line items from the session
        line_items = stripe.checkout.Session.list_line_items(session_object["id"])

        # Extract ordered item details
        ordered_items = []
        total_amount = 0
        for item in line_items["data"]:
            ordered_item = {
                "description": item["description"],
                "quantity": item["quantity"],
                # "amount_total": item["amount_total"] / 100,
                # "price": item["price"] / 100,
                "amount_total": item["price"]["unit_amount"] / 100,
            }
            total_amount += item["amount_total"]
            ordered_items.append(ordered_item)

        print("Ordered Items:", ordered_items)
        # create order
        order = Order(
            user_id=user_id,
            total_amount=(total_amount / 100),
            order_status="UnFulfilled",
        )
        storage.new(order)

        for item in ordered_items:
            order_item = OrderItems(
                order_id=order.id,
                price=item["amount_total"],
                title=item["description"],
                quantity=item["quantity"],
            )

            product = (
                session.query(Product).filter_by(title=item["description"]).first()
            )
            product.quantity -= item["quantity"]

            storage.new(order_item)
        storage.save()

    return jsonify(success=True)
