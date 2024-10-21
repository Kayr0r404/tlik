from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy import (
    create_engine,
    Column,
    Integer,
    String,
    Boolean,
    Numeric,
    ForeignKey,
)
from os import environ
import json

# Load JSON data
with open("../../../client/src/assets/products.json") as f:
    data = json.load(f)

Base = declarative_base()


class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    products = relationship("Product", backref="category")


class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True)
    title = Column(String(32))
    in_stock = Column(Boolean, default=True)
    quantity = Column(Integer, default=0)
    price = Column(Numeric)

    category_id = Column(Integer, ForeignKey("categories.id"))


# Create a category if it does not exist
# category_name = "Furniture"
# category = session.query(Category).filter_by(name=category_name).first()
# if not category:
#     category = Category(name=category_name)
#     session.add(category)
#     session.commit()

# # Add products to the session
# for i in data:
#     p = Product(
#         title=i["title"],
#         in_stock=True,
#         quantity=10,
#         price=i["price"],
#         category=category,
#     )
#     session.add(p)

# Commit the session
