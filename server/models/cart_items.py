from models.base_model import BaseModel, Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship


class CartItem(BaseModel, Base):
    __tablename__ = "cart_items"

    # id = Column(Integer, primary_key=True)
    user_id = Column(String(255), ForeignKey("users.id"))
    product_id = Column(String(255), ForeignKey("products.id"))
    quantity = Column(Integer, nullable=False)

    # Relationship back to Product and Cart
    product = relationship("Product", back_populates="cart_item")
    user = relationship("User", back_populates="cart_item")
