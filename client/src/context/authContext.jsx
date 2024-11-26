import { createContext, useState, useEffect, } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [responseStatus, setResponseStatus] = useState(-1);

    // Function to log in the user
    const login = async (email, password) => {
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email, password: password
                })
            });

            setResponseStatus(response.status);

            if (response.ok) {
                const data = await response.json();
                // Save token and user data to localStorage
                localStorage.setItem('token', data['access_token']);
                localStorage.setItem('userData', JSON.stringify(data['user_data']));
                // Update User state
                setUser(data['user_data']);
                setIsAuthenticated(true);

                // Sync cart if it contains items
                if (localStorage.getItem('cartItems') && localStorage.getItem('cartItems').length !== 0) {
                    await syncCartWithServer();
                }
                console.log(data)
            }
            console.log(isAuthenticated)
            console.log('Logged in successfully!');
        } catch (error) {
            console.error("Error logging in", error);
        }
    };

    // Function to create a user profile
    const createProfile = async (newEmail, newPassword, last_name, first_name) => {
        try {
            const res = await axios.post('/register', { email: newEmail, password: newPassword, first_name: first_name, last_name: last_name });
			console.log(res.data);
            const token = res.data['access_token'];
            const userData = res.data['user_data'];

            // Save token and user data to localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Set email and password for login, then call login
            setEmail(newEmail);
            setPassword(newPassword);
            await login(newEmail, newPassword);
        } catch (error) {
            console.error("Error creating profile", error);
        }
    };

    async function syncCartWithServer() {
        try {
          const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      
          const response = await fetch('/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(cartItems)
          });
      
          if (!response.ok) {
            throw new Error('Error submitting cart items');
          }
      
          const data = await response.json();
          console.log('Cart items submitted successfully:', data);
        } catch (error) {
          console.error('Error submitting cart items:', error);
        }
      }

    // Check for token in localStorage when the component mounts
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUserData = localStorage.getItem('userData');
    
        if (storedToken) {
            if (isTokenExpired(storedToken)) {
                localStorage.removeItem('token');
                localStorage.removeItem('userData');
                localStorage.removeItem('cartItems');
                setUser(null);
                setIsAuthenticated(false);
                console.log('expired');
            } else {
                setIsAuthenticated(true);
                setUser(JSON.parse(storedUserData));
            }
        } else {
            setIsAuthenticated(false);
            setUser(null);
        }
    }, []);
    

    // Function to log out the user
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        localStorage.removeItem('cartItems');
        setUser(null);
        setIsAuthenticated(false);
        console.log('Logged out');
    };

    const isTokenExpired = (token) => {
        if (!token) return true;
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          return decodedToken.exp < currentTime;
        } catch (error) {
          console.error('Error decoding token:', error);
          return true;
        }
      };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, email, setEmail,
        password, setPassword, syncCartWithServer, createProfile, responseStatus, isTokenExpired}}>
            {children}
        </AuthContext.Provider>
    );
};
