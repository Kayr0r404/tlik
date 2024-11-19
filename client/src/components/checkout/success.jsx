import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SuccesfullPayment() {
    const navigate = useNavigate();

    useEffect(() => {
        const executeClearCart = () => {
            const _clearCart = async () => {
                try {
                    const res = await fetch('/delete-cart', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                    if (res.ok) {
                        localStorage.removeItem('cartItems');
                        console.log('Successfully cleared cart');
                        window.location.reload();
                    } else {
                        console.error("Failed to clear cart");
                    }
                } catch (error) {
                    console.error("Error clearing cart:", error);
                }
            };

            _clearCart();
        };

        executeClearCart();

        setTimeout(()=> navigate('/'),8000)
    }, []);

    const handleViewOrder = () => {
        navigate('/profile');
    };

    return (
        <div style={styles.container}>
            <div style={styles.message}>
            <p style={styles.success}>SUCCESSFUL PAYMENT</p>
            <button style={styles.button} onClick={handleViewOrder}> View Order </button>
            
        </div>
        </div>
    );
}

export default SuccesfullPayment;

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        backgroundColor: '#f4f4f9',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif'
    },
    message: {
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        // boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        // height: 'vh',
        backgroundColor: '#f4f4f9',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif'
    },
    success: {
        fontSize: '24px',
        color: '#28a745',
        marginBottom: '15px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    }
};

styles.button[':hover'] = {
    backgroundColor: '#0056b3',
};
