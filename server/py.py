from models.cart_items import CartItem
from models.engine.db_storage import DBStorage
from sqlalchemy.ext.declarative import DeclarativeMeta

storage = DBStorage()
storage.reload()

session = storage._DBStorage__session


def to_dict(obj):
    """Convert SQLAlchemy model instance into dictionary, excluding certain keys."""
    # List of keys to exclude
    exclude_keys = {"category", "registry"}

    if isinstance(obj.__class__, DeclarativeMeta):
        fields = {}
        for field in [x for x in dir(obj) if not x.startswith("_") and x != "metadata"]:
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


cart_items = session.query(CartItem).filter_by(user_id=1).all()
if cart_items:
    cart_data = [item.to_dict() for item in cart_items]

print(cart_items)
