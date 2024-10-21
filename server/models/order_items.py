from models.base_model import BaseModel, Base
from sqlalchemy import Column, DECIMAL, Integer, ForeignKey, String
from sqlalchemy.orm import relationship


class OrderItems(BaseModel, Base):
    __tablename__ = "order_items"  # Use lowercase for table name

    # id = Column(Integer, primary_key=True)  # Renamed to 'id' for consistency
    order_id = Column(String(255), ForeignKey("orders.id"))  # Correct ForeignKey syntax
    product_id = Column(String(255), ForeignKey("products.id"))
    quantity = Column(Integer, nullable=False)
    price = Column(DECIMAL(10, 2), nullable=False)

    # Establish a relationship with the Product model
    product = relationship("Product", back_populates="order_items")
