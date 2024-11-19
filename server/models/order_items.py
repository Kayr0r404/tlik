from models.base_model import BaseModel, Base
from sqlalchemy import Column, DECIMAL, Integer, ForeignKey, String
from sqlalchemy.orm import relationship


class OrderItems(BaseModel, Base):
    __tablename__ = "order_items"

    order_id = Column(String(255), ForeignKey("orders.id"))
    title = Column(String(100), nullable=False)
    quantity = Column(Integer, nullable=False)
    price = Column(DECIMAL(10, 2), nullable=False)

    # Establish a relationship with the Product model
    order = relationship("Order", back_populates="order_items")
