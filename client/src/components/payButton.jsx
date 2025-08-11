const PayButton = () => {

    const handlePayNow = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: localStorage.getItem('cartItems'),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url; 
            } else {
                console.error('Failed to create checkout session.');
            }
        } catch (error) {
            console.error('Error in handlePayNow:', error);
        }
    };

    return (
        <button onClick={handlePayNow}>Pay Now</button>
    );
};

export default PayButton;
