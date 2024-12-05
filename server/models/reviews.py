from models.base_model import BaseModel, Base
from sqlalchemy import Column, Integer, Text, ForeignKey, String
from sqlalchemy.orm import relationship
import datetime


class Review(BaseModel, Base):
    __tablename__ = "reviews"

    user_id = Column(String(255), ForeignKey("users.id"))
    product_id = Column(String(255), ForeignKey("products.id"))
    rating = Column(Integer, nullable=False)
    comment = Column(Text, nullable=True)
    user = relationship("User", back_populates="review")
    product = relationship("Product", back_populates="review")
