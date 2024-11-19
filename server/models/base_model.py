from datetime import datetime
import uuid
from sqlalchemy import Column, DateTime, String
from sqlalchemy.ext.declarative import declarative_base
import json
from sqlalchemy.ext.declarative import DeclarativeMeta

time_format = "%Y-%m-%dT%H:%M:%S.%f"

Base = declarative_base()


class BaseModel:
    """The BaseModel class from which all other classes will inherit"""

    id = Column(String(60), primary_key=True, default=lambda: str(uuid.uuid4())[:5])
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __init__(self, *args, **kwargs):
        """Initialization of the base model"""
        self.id = kwargs.get("id", str(uuid.uuid4()))
        self.created_at = kwargs.get("created_at", datetime.utcnow())
        if isinstance(self.created_at, str):
            self.created_at = datetime.strptime(self.created_at, time_format)
        self.updated_at = kwargs.get("updated_at", self.created_at)
        if isinstance(self.updated_at, str):
            self.updated_at = datetime.strptime(self.updated_at, time_format)

        for key, value in kwargs.items():
            if key not in {"id", "created_at", "updated_at"}:
                setattr(self, key, value)

    def __str__(self):
        """String representation of the BaseModel class"""
        return f"[{self.__class__.__name__}] ({self.id}) {self.__dict__}"

    # def save(self):
    #     """Update 'updated_at' with the current datetime and save the instance"""
    #     self.updated_at = datetime.utcnow()
    #     models.storage.new(self)
    #     models.storage.save()

    def to_dict(obj=None):
        """Convert SQLAlchemy model instance into dictionary, excluding certain keys."""
        # List of keys to exclude
        exclude_keys = {"category", "registry"}

        if isinstance(obj.__class__, DeclarativeMeta):
            fields = {}
            for field in [
                x for x in dir(obj) if not x.startswith("_") and x != "metadata"
            ]:
                # Skip excluded keys
                if field in exclude_keys:
                    continue

                data = obj.__getattribute__(field)
                try:
                    # This will raise TypeError if the value is not JSON serializable
                    json.dumps(data)
                    fields[field] = data
                except TypeError:
                    fields[field] = str(data)

            return fields

    # def delete(self):
    #     """Delete the current instance from storage"""
    #     models.storage.delete(self)
