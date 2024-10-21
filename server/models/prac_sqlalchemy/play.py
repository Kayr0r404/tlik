from engine import DBStorage

db = DBStorage()


data = db.all("Product")

print((data))
