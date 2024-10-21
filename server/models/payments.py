from models.base_model import BaseModel, Base
from sqlalchemy import Column, DECIMAL, Integer, String, ForeignKey, DateTime
import datetime


class Payment(BaseModel, Base):
    __tablename__ = "payments"  # Use lowercase for table name

    # id = Column(Integer, primary_key=True)  # Renamed to 'id' for consistency
    order_id = Column(String(255), ForeignKey("orders.id"))  # Correct ForeignKey syntax
    amount = Column(DECIMAL(10, 2), nullable=False)
    payment_method = Column(String(255), nullable=False)
    billing_address = Column(String(255), nullable=False)
    card_number = Column(Integer, nullable=False)
    # created_at = Column(DateTime, default=datetime.datetime.utcnow)
