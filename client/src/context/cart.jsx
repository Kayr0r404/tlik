import { createContext, useContext, useState, useEffect } from 'react'
import { AuthContext } from './authContext';
import axios from 'axios';

export const CartContext = createContext();
export const CartProvider = ({ children }) => {

const { isAuthenticated } = useContext(AuthContext);
let [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])

useEffect(() => {
    if (isAuthenticated) {
      axios.get("/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        const cartItems = response.data; // Assuming your response data is the cart items
  
        // Fetch product details for each cart item
        const productPromises = cartItems.map(item => 
          axios.get(`/products/${item.product_id}`)
          .then(response => {
            response.data.quantity=item.quantity;
              return response.data;
          })
          .catch(error => {
            console.error(`${error} Failed to fetch product ${item.product_id}`);
            return null; // Return null if fetching the product fails
          })
        );
        
        return Promise.all(productPromises); // Wait for all product requests to complete
      })
      .then(productData => {
        // Filter out any failed (null) requests and update the cart items
        const validProducts = productData.filter(product => product !== null);
        setCartItems(validProducts); // Update cart items state with product details
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
      });
    }
  }, [isAuthenticated]);

  const addToCart = async (item) => {
    const isItemInCart = cartItems.find(
        (cartItem) => item.id === cartItem.id
    );

    if (isItemInCart) {
        // Update the quantity in the backend and then update the state
        try {
            if (isAuthenticated) { 
                const response = await fetch(`/cart/${isItemInCart.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ quantity: isItemInCart.quantity + 1 })
                });
    
                if (!response.ok) {
                    throw new Error('Error updating cart item');
                }
            }

            const updatedCartItems = cartItems.map(cartItem =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            );

            // Update cart items state
            setCartItems(updatedCartItems);

        } catch (error) {
            console.error('Error updating cart item:', error);
        }
    } else {
        if (isAuthenticated) {
            const response = await fetch('/cart',{
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                body: JSON.stringify([{ ...item, quantity: 1 }])
            });

            if (!response.ok) throw new Error('Error adding cart item');
        }
        // Add the new item to the cart
        setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
};


const removeFromCart = async (item) => {
    const cartItem = cartItems.find((cartItem) => item.id === cartItem.id);
  
    if (cartItem) {
      if (cartItem.quantity === 1) {
        if (isAuthenticated) {
            const response = await fetch(`/delete-cart/${item.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(cartItems.filter((cartItem) => cartItem.id !== item.id))
            });
        }
        setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
      } else {
        if (isAuthenticated) {
            const response = await fetch(`/cart/${item.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({quantity: cartItem.quantity - 1})
            });
        }
        setCartItems(
          cartItems.map(
            (cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
          )
        );
      }
    }
}

const deleteItemInCart = async (item) => {
    const cartItem = cartItems.find((cartItem) => item.id === cartItem.id);
  
    if (isAuthenticated && cartItem) {
      try {
        // Send DELETE request to the server
        const response = await fetch(`/cart/${item.id}`, {
          method: 'DELETE', // Fixed typo
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Proper authorization header
          },
          body: JSON.stringify({ id: item.id, product_id: item.product_id }) // Send required data
        });
  
        if (!response.ok) {
          throw new Error('Error deleting cart item');
        }
  
        // No need to parse response if it's a DELETE request, unless your server sends something back.
        console.log('Cart item deleted successfully');
  
        // Update the UI after successful deletion
        setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
  
      } catch (error) {
        console.error('Error deleting cart item:', error);
      }
    }
  };  

const clearCart =async () => {
  console.log(isAuthenticated)
    if (isAuthenticated) {
        await fetch('/delete-cart',{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Proper authorization header
            },
        })
    }
    localStorage.removeItem('cartItems');
    setCartItems([]);
};

const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0); // calculate the total price of the items in the cart
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
    setCartItems(JSON.parse(cartItems));
    }
}, []);

return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        deleteItemInCart,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

