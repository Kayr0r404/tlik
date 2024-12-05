from models.base_model import BaseModel, Base
from models.cart_items import CartItem
from sqlalchemy import Column, Integer, String, Text, ForeignKey, Float
from sqlalchemy.orm import relationship


class Product(BaseModel, Base):
    __tablename__ = "products"

    title = Column(String(255), nullable=False)
    image = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    price = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False)

    category_name = Column(String(255), ForeignKey("categories.name"))

    # Establish a relationship with the Category model
    category = relationship("Category", back_populates="products")

    # Define relationship with OrderItems
    cart_item = relationship(CartItem, back_populates="product")
    review = relationship("Review", back_populates="product")
    wishlist = relationship("Wishlist", back_populates="product")
