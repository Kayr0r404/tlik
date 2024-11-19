from models.base_model import BaseModel, Base
from sqlalchemy import String, Column, DECIMAL, ForeignKey
from sqlalchemy.orm import relationship
import uuid, random


class Order(BaseModel, Base):
    __tablename__ = "orders"

    order_number = Column(
        String(30), nullable=False, default=lambda: Order.generate_order_number()
    )
    user_id = Column(String(255), ForeignKey("users.id"))
    order_status = Column(String(255), nullable=False)
    total_amount = Column(DECIMAL, nullable=False)

    user = relationship("User", back_populates="order")
    order_items = relationship("OrderItems", back_populates="order")

    @staticmethod
    def generate_order_number():
        order_number = uuid.uuid4().int
        return f"tlik{int(str(order_number)[: random.randint(4, 6)])}"
