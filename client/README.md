# **Tlik E-commerce Frontend**

Welcome to the frontend of **Tlik**, an e-commerce platform where users can shop for clothes and home utilities. This project is built using **React** and follows best practices for modern web development.

---

## **Technologies Used**

This project utilizes the following technologies:

- **React**: Frontend library for building user interfaces.  
- **React Router**: For navigation and routing between pages.  
- **Axios/ Fetch**: For making HTTP requests to the backend API.  
- **CSS/SCSS**: For styling components.  
- **Context API**: For state management.  

---

## **Features**

- User authentication (login and registration).  
- Product browsing and search functionality.  
- Shopping cart and wishlist management.  
- Seamless integration with the backend API for dynamic data.  

---

## **Project Structure**

The project is organized into the following key directories:

- **`src/components/`**: Contains reusable React components.  
- **`src/assets/`**: Stores images, icons, and other static assets.  
- **`src/styles/`**: Contains global and component-specific styles.  

---

## **Prerequisites**

Before running the project, ensure you have the following installed:

1. **Node.js** (v16+ recommended)  
2. **npm** or **yarn** (for package management)

---

## **Getting Started**

Follow these steps to set up and run the project locally.

### 1. **Clone the Repository**
Clone the project from GitHub:
```bash
git clone https://github.com/Kayr0r404/tlik.git
```
---
 
### 2. Navigate to the Frontend Directory
Change to the client project directory:

```bash
cd tlik/client
```
---
 
### 3. Install Dependencies
Install the required packages using npm or yarn:

```node
npm install .
```
# or
```node
yarn install .
```
---
 
### 4. Set Up Environment Variables
Create a .env file in the root of your project and configure the following environment variables:

env

REACT_APP_API_URL=http://localhost:5000/api
This ensures the frontend can communicate with the backend API.

### 5. Run the Development Server
Start the React development server:

```bash
npm start
```

# or
```
yarn start
```
---
 
The application should now be running at http://localhost:3000.
---

**Available Scripts**
In the project directory, you can run:

* npm start: Runs the app in development mode.
* npm run build: Builds the app for production.
* npm test: Runs tests.

---

#### **Folder Structure**
Below is a sample structure of the src directory:

```bash
src/
├── assets/         # Static assets (images, icons, etc.)
├── components/     # Reusable components
├── styles/         # Global and component-specific styles
├── App.js          # Main app entry point
├── index.js        # React entry point
└── .env            # Environment variables
```
**Features in Detail**
#### Authentication
* Login and Register pages.
* Uses tokens to manage user sessions.
#### Product Browsing
* Displays a list of products fetched from the backend.
* Includes a search bar for finding specific items.
#### Cart and Wishlist
* Add or remove items from the cart or wishlist.
* View total price and item count dynamically.
#### Responsive Design
* The app is fully responsive and optimized for both mobile and desktop users.
