from models.base_model import BaseModel, Base
from sqlalchemy import String, Column, DECIMAL, ForeignKey


class Order(BaseModel, Base):
    __tablename__ = "orders"  # Keep table names lowercase for consistency

    user_id = Column(String(255), ForeignKey("users.id"))  # Correct ForeignKey syntax
    order_status = Column(String(255), nullable=False)
    total_amount = Column(DECIMAL, nullable=False)
