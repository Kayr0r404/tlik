from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from os import environ
from models.prac_sqlalchemy.sql import Base, Category, Product

classes = {"Product": Product, "Category": Category}


class DBStorage:
    __engine = None
    __session = None

    def __init__(self) -> None:
        # Retrieve environment variables
        psswrd = environ.get("TLIK_MYSQL_PWD")
        db = environ.get("TLIK_MYSQL_DB")
        host = environ.get("TLIK_MYSQL_HOST")
        usr = environ.get("TLIK_MYSQL_USER")
        self.__engine = create_engine(f"mysql+mysqldb://{usr}:{psswrd}@{host}/{db}")

        # Create a session factory
        self.Session = sessionmaker(bind=self.__engine)
        self.__session = scoped_session(self.Session)

    def all(self, cls=None):
        """Query on the current database session"""
        new_dict = {}
        for clss in classes:
            if cls is None or cls is classes[clss] or cls == clss:
                objs = self.__session.query(classes[clss]).all()
                for obj in objs:
                    key = obj.id
                    new_dict[key] = obj
        return new_dict

    def reload(self):
        """Reloads data from the database"""
        Base.metadata.create_all(self.__engine)
        self.__session.remove()
        self.__session = scoped_session(self.Session)
