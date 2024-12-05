from models.base_model import BaseModel, Base
from sqlalchemy import Column, DECIMAL, Integer, String, ForeignKey, DateTime
import datetime


class Payment(BaseModel, Base):
    __tablename__ = "payments"

    order_id = Column(String(255), ForeignKey("orders.id"))
    amount = Column(DECIMAL(10, 2), nullable=False)
    payment_method = Column(String(255), nullable=False)
    billing_address = Column(String(255), nullable=False)
    card_number = Column(Integer, nullable=False)
