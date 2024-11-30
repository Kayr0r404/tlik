from models.base_model import BaseModel, Base

# from models.cart import Cart
from sqlalchemy import String, Integer, Column
from sqlalchemy.orm import relationship


class User(BaseModel, Base):
    __tablename__ = "users"

    # id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String(255), nullable=False)
    last_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(128), nullable=False)

    review = relationship("Review", back_populates="user")
    cart_item = relationship("CartItem", back_populates="user")
    wishlist = relationship("Wishlist", back_populates="user")
    address = relationship("UserAddres", back_populates="user")
    order = relationship("Order", back_populates="user")
