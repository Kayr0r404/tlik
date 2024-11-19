from flask import Blueprint
from models.engine.db_storage import DBStorage

app_views_bp = Blueprint("app_views", __name__)
storage = DBStorage()
storage.reload()
session = storage._DBStorage__session

# Import the views (routes) to ensure they get registered
from api.v1.views.products import *
from api.v1.views.user import *
from api.v1.views.cart import *
from api.v1.views.address import *
from api.v1.views.stripe import *
from api.v1.views.orders import *
