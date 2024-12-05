from models.base_model import BaseModel, Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship


class Category(BaseModel, Base):
    __tablename__ = "categories"

    name = Column(String(255), nullable=False, unique=True)

    # Back-populates the relationship to products
    products = relationship("Product", back_populates="category")
