from models.base_model import BaseModel, Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship


class Wishlist(BaseModel, Base):
    __tablename__ = "wishlist"

    user_id = Column(String(255), ForeignKey("users.id"))
    product_id = Column(String(255), ForeignKey("products.id"))
    quantity = Column(Integer, nullable=False)

    product = relationship("Product", back_populates="wishlist")
    user = relationship("User", back_populates="wishlist")
