import { useEffect, useState } from "react";
import '../style/addressForm.css';

const AddressForm = () => {
     
    const [address, setAddress] = useState("");
    const [suburb, setSuburb] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [addressId, setAddressId] = useState("");
    const [initialData, setInitialData] = useState(null);

    
    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const response = await fetch('/get-address', {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.ok) {
                    const addressData = await response.json();
                    
                    console.log('Fetched Address:', addressData);
                    setCity(addressData.full_address.city);
                    setPhoneNumber(addressData.full_address.phone);
                    setProvince(addressData.full_address.province);
                    setFirstName(addressData.full_address.first_name);
                    setLastName(addressData.full_address.last_name);
                    setAddress(addressData.full_address.address);
                    setPostalCode(addressData.full_address.postal_code);
                    setSuburb(addressData.full_address.suburb);
                    setAddressId(addressData.full_address.id);
                    setInitialData(addressData);
                } else {
                    console.error("Failed to fetch address data");
                }
            } catch (error) {
                console.error("Error occurred while fetching address:", error);
            }
        };

        fetchAddress();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Build payload with only changed fields
        const updatedFields = {};

        if (address !== initialData.full_address.address) updatedFields.address = address;
        if (suburb !== initialData.full_address.suburb) updatedFields.suburb = suburb;
        if (city !== initialData.full_address.city) updatedFields.city = city;
        if (province !== initialData.full_address.province) updatedFields.province = province;
        if (postalCode !== initialData.full_address.postal_code) updatedFields.postalCode = postalCode;
        if (phoneNumber !== initialData.full_address.phone) updatedFields.phone = phoneNumber;
        if (firstName !== initialData.full_address.first_name) updatedFields.firstName = firstName;
        if (lastName !== initialData.full_address.last_name) updatedFields.lastName = lastName;

        // Only send the API request if there are changed fields
        if (Object.keys(updatedFields).length > 0) {
            try {
                const response = await fetch(`/update-address/${addressId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(updatedFields)
                });

                if (response.ok) {
                    alert("Address updated successfully!");
                } else {
                    alert("Failed to update the address.");
                }
            } catch (error) {
                console.error("Error occurred while updating address:", error);
            }
        } else {
            alert("No changes detected.");
        }
    };
    
    return (
        <form className="address-form" onSubmit={handleSubmit}>
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
    );
};

export default AddressForm;
