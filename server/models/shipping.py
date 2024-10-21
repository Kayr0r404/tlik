from models.base_model import BaseModel, Base
from sqlalchemy import Column, DECIMAL, Integer, String, ForeignKey, DateTime
import datetime


class Shipping(BaseModel, Base):
    __tablename__ = "shipping"  # Use lowercase for table name

    # id = Column(Integer, primary_key=True)  # Renamed to 'id' for consistency
    order_id = Column(String(255), ForeignKey("orders.id"))  # Correct ForeignKey syntax
    shipping_method = Column(String(255), nullable=False)
    shipping_cost = Column(DECIMAL(10, 2), nullable=False)
    # shipping_address_id = Column(
    #     Integer, ForeignKey("shipping_address.id")  # Correct ForeignKey syntax
    # )
    estimated_delivery_date = Column(DateTime, nullable=True)  # Added this column
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
