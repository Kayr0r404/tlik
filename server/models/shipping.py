from models.base_model import BaseModel, Base
from sqlalchemy import Column, DECIMAL, Integer, String, ForeignKey, DateTime
import datetime


class Shipping(BaseModel, Base):
    __tablename__ = "shipping"

    order_id = Column(String(255), ForeignKey("orders.id"))
    shipping_method = Column(String(255), nullable=False)
    shipping_cost = Column(DECIMAL(10, 2), nullable=False)
    estimated_delivery_date = Column(DateTime, nullable=True)
