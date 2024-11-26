# **Tlik E-commerce Backend**

Welcome to the backend of **Tlik**, a simple e-commerce platform for shopping for watches and home utilities. This project is built using **Python** and follows a clean, modular architecture for scalability.

---

## **Technologies Used**

This project utilizes the following technologies and tools:

- **Python**: Core programming language.  
- **MySQL**: Relational database for data storage.  
- **Flask**: Web framework for building the backend.  
- **SQLAlchemy**: Object-Relational Mapping (ORM) tool for database operations.

---

## **Features**

- User authentication (login and registration).  
- Product listing and searching.  
- Cart and wishlist functionality.  
- Order management system.  

---

## **Project Structure**

The project is organized into the following key directories:

- **`models/`**: Contains database models representing MySQL tables.  
- **`api/`**: Includes the API routes and endpoints for handling user requests.  
- **`products/`**: Scripts for adding initial data to the database.  
- **`static/`**: Stores static assets (if any).  
- **`templates/`**: Contains HTML templates for server-side rendering (if applicable).  

---

## **Prerequisites**

Before setting up the project, ensure you have the following installed:

1. **Python 3.8+**
2. **MySQL**  
3. **Git**

---

## **Getting Started**

Follow these steps to set up and run the project locally.

### 1. **Clone the Repository**
Clone the project from GitHub:
```bash
git clone https://github.com/Kayr0r404/tlik.git
```

---

### 2. **Navigate to the Server Directory**
Change to the backend server directory:

```bash
cd tlik/server
```
---

### 3. **Set Up a Virtual Environment**
Create a virtual environment to manage dependencies:

```bash
python3 -m venv .my_virtual_environment
```
Activate the virtual environment:

macOS/Linux:
```bash
source .my_virtual_environment/bin/activate
```
Windows:
```bash
.my_virtual_environment\Scripts\activate
```
---
### 4. **Install Dependencies**
Install the required packages from requirements.txt:

```bash
pip install -r requirements.txt
```
---
### 5. **Set Up the Database**
Create a MySQL database for the project:
```sql
CREATE DATABASE tlik_db;
```
Configure database connection settings in the project (e.g., environment variables or a configuration file).
Populate the database with dummy inventory data:

```python3
python3 -m products.add_products
```
---
### 6. **Run the Application**
Start the backend server:

```python
python3 -m app
```
The application should now be running locally. Open your browser and navigate to http://localhost:5000 to access the app.

## **API Endpoints**
---
#### User Authentication
POST /register: Register a new user.\
POST /login: Log in an existing user.\

---
#### Products
GET /api/products: Retrieve all products.\
GET /api/products/<id>: Retrieve a specific product by ID.

---
#### Cart
POST /api/cart: Add an item to the cart.\
GET /api/cart: View all cart items.

---
#### Orders
POST /api/orders: Place an order.\
GET /api/orders: View all orders for a user.

