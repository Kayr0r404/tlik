from models.base_model import BaseModel, Base
from models.cart_items import CartItem
from sqlalchemy import Column, Integer, String, Text, ForeignKey, Float
from sqlalchemy.orm import relationship


class Product(BaseModel, Base):
    __tablename__ = "products"

    # id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    image = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)  # Corrected spelling
    price = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False)
    # created_at = Column(DateTime, default=datetime.datetime.utcnow)

    category_name = Column(
        String(255), ForeignKey("categories.name")
    )  # Corrected syntax

    # Establish a relationship with the Category model (assuming it exists)
    category = relationship("Category", back_populates="products")

    # Define relationship with OrderItems
    order_items = relationship("OrderItems", back_populates="product")
    cart_item = relationship(CartItem, back_populates="product")

    review = relationship("Review", back_populates="product")
