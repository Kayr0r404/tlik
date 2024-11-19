from models.base_model import BaseModel, Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship


class UserAddres(BaseModel, Base):
    __tablename__ = "user_addresses"

    first_name = Column(String(255), nullable=False)
    last_name = Column(String(255), nullable=False)
    phone = Column(Integer, nullable=False)
    address = Column(String(255), nullable=False)
    suburb = Column(String(255), nullable=True)
    city = Column(String(255), nullable=False)
    province = Column(String(255), nullable=False)
    postal_code = Column(String(10), nullable=False)
    user_id = Column(String(255), ForeignKey("users.id"))

    user = relationship("User", back_populates="address")
