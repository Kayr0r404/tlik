from models.engine.db_storage import DBStorage

# from models.cart import Cart
from models.reviews import Review
from models.user import User
from models.cart_items import CartItem


storage = DBStorage()
storage.reload()

user = storage.one("User")
# # user = User(user=user)
# storage.new(user)
# storage.save()
# storage.__session.query("")
# Retrieve the first Product from storage
product = storage.one("Product")
if product:
    # Create a new review
    cart_item = CartItem(rating=5, quantity=2, product=product, user=user)
    storage.new(cart_item)
    storage.save()
else:
    print("No product found!")
