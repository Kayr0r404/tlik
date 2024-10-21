from models.engine.db_storage import DBStorage

# from
from models.user import User
from models.categories import Category
from models.products import Product

storage = DBStorage()
storage.reload()


# Create a new user
new_user = User(
    username="Karabo_",
    password="securepassword123",
    email_address="karabo1@example.com",
    first_name="Karabo",
    last_name="Mahlare",
)

new_category = Category(name="womens's clothing")

new_product = Product(
    tittle="newstaff",
    category=new_category,
    image="path",
    description="quentesa",
    price=145069,
    quantity=14,
)

# Add the user to the session and commit
# storage.new(new_category)
storage.new(new_product)
storage.new(new_user)

storage.new(new_user)
storage.save()
