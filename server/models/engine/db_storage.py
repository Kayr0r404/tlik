from os import environ

from models.products import Product
from models.order import Order
from models.categories import Category
from models.user_address import UserAddres
from models.reviews import Review
from models.wishlist import Wishlist
from models.order_items import OrderItems
from models.payments import Payment
from models.shipping import Shipping
from models.user_payment import UserPayment
from models.user import User
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from models.base_model import Base

tables = {
    "Product": Product,
    "User": User,
    "UserPayment": UserPayment,
    "Shipping": Shipping,
    "Payment": Payment,
    "OrdeItems": OrderItems,
    "Wishlist": Wishlist,
    "Review": Review,
    "UserAddres": UserAddres,
    "Category": Category,
    "Order": Order,
}


class DBStorage:
    __engine = None
    __session = None

    def __init__(self) -> None:
        self.__psswd = environ.get("TLIK_MYSQL_PWD")
        self.__db = environ.get("TLIK_MYSQL_DB")
        self.__usr = environ.get("TLIK_MYSQL_USER")
        self.__host = environ.get("TLIK_MYSQL_HOST")
	self.__port = environ.get("TLIK_MYSQL_PORT")

        self.__engine = create_engine(
			f"mysql+mysqldb://{self.__usr}:{self.__psswd}@{self.__host}:{self.__port}/{self.__db}",
            pool_size=100,  # Increase the pool size
            max_overflow=50,  # Increase the overflow limit
            pool_timeout=60,  # Increase the timeout for getting a connection
        )

    def save(self):
        """commit changes to db"""
        self.__session.commit()

    def delete(self, object=None):
        if object:
            self.__session.delete(object)

    def all(self, cls=None):
        """Query on the current database session"""
        new_dict = []
        for clss in tables:
            if cls is None or cls is tables[clss] or cls == clss:
                objs = self.__session.query(tables[clss]).all()
                for obj in objs:
                    new_dict.append(obj)
        return new_dict

    def one(self, cls):
        return self.__session.query(tables[cls]).first()

    def new(self, object):
        self.__session.add(object)

    def reload(self):
        """reloads data from the database"""
        Base.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session

    def close(self):
        self.__session.remove()
