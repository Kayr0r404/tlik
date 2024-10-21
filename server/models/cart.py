# from models.base_model import BaseModel, Base

# # from models.user import User
# from sqlalchemy import Column, Integer, ForeignKey
# from sqlalchemy.orm import relationship


# class Cart(BaseModel, Base):
#     __tablename__ = "carts"

#     id = Column(Integer, primary_key=True)
#     user_id = Column(Integer, ForeignKey("users.id"))
#     # Define the relationship with CartItem (one-to-many)
#     items = relationship("CartItem", back_populates="cart")
#     user = relationship("User", back_populates="cart")
