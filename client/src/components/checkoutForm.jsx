import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/cart';
import AddressForm from './addressForm';
import PayButton from './payButton';
import '../style/checkout.css';

function CheckoutForm() {
    const { cartItems, getCartTotal } = useContext(CartContext);

    const [address, setAddress] = useState("");
    const [suburb, setSuburb] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [data, setData] = useState(null);
    const [hasAddress, setHasAddress] = useState(false);
    const [showComponent, setShowComponent] = useState(false);

    useEffect(()=> {
        const getAddress = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/get-address`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            if (response.ok) {
                setData(await response.json());
                setHasAddress(true);
            }
        };

        getAddress();
    }, []);

    const handleChange = () => setShowComponent(true);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/post-address`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    phoneNumber,
                    address,
                    suburb,
                    city,
                    province,
                    postalCode
                })
            });

            if (response.ok) {
                const responseData = await response.json();
                setData(responseData);
            } else {
                console.error('Error occurred while registering address');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <div className='checkout'>
        { hasAddress ? 
        (
            <div className='contact-info'>
                <h2>Contact Information</h2>
                <p>Email: {data.contact.email}</p>
                <p>Phone Number: {`+27 ${data.contact.phone}`}</p>

                <h2>Shipping Address</h2>
                <p>
                    {data.address}
                    <button onClick={() => handleChange()}> change </button>
                    {showComponent && <AddressForm />}
                </p>
                
            </div>
        )
        :
            (
            <form className='address-form' onSubmit={onSubmitHandler}>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        name="firstName"
                        placeholder="First Name"
                        type="text"
                    />

                    <label htmlFor="lastName">Last Name</label>
                    <input
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        name="lastName"
                        placeholder="Last Name"
                        type="text"
                    />

                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Phone Number"
                        type="tel"
                    />
                </div>

                <label htmlFor="address">Address</label>
                <input
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                    type="text"
                />

                <label htmlFor="suburb">Suburb</label>
                <input
                    required
                    value={suburb}
                    onChange={(e) => setSuburb(e.target.value)}
                    placeholder="Suburb"
                    type="text"
                />

                <div>
                    <label htmlFor="city">City</label>
                    <input
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        type="text"
                    />

                    <label htmlFor="province">Province</label>
                    <select
                        required
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        name="province"
                    >
                        <option value="" disabled>Select your province</option>
                        <option value="Limpopo">Limpopo</option>
                        <option value="Mpumalanga">Mpumalanga</option>
                        <option value="Gauteng">Gauteng</option>
                        <option value="North West">North West</option>
                        <option value="Free State">Free State</option>
                        <option value="Kwazulu Natal">Kwazulu Natal</option>
                        <option value="Eastern Cape">Eastern Cape</option>
                        <option value="Northern Cape">Northern Cape</option>
                        <option value="Western Cape">Western Cape</option>
                    </select>

                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="Postal Code"
                        type="text"
                    />
                </div>

                <button type="submit">Continue to Shipping</button>
            </form>
            )
        }

        <div className='cart-summary'>
            <h2>Your Order Summary</h2>
            <p className='summary-detail'>
                Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}): 
                <span className='subtotal-price'>R {Math.round(getCartTotal() * 100) / 100}</span>
            </p>
            <p className='summary-detail'>
                You save: 
                <span className='savings-price'>
                    - R {Math.round(cartItems.reduce((acc, item) => acc + item.discount, 0) * 100) / 100}
                </span>
            </p>
            <p className='summary-detail'>
                Delivery Fee: 
                <span style={{ color: '#cf008c' }} className='delivery-fee'>
                    {getCartTotal() >= 600 ? 'Free' : 'R ' + 60}
                </span>
            </p>
            <p className='total-price'>
                Total: R {getCartTotal() < 600 ? (Math.round(getCartTotal() * 100) / 100) + 60 : (Math.round(getCartTotal() * 100) / 100)}
            </p> 
            <PayButton />
        </div>
        </div>
    );
}

export default CheckoutForm;
