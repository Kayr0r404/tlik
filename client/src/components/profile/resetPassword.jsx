import { useState } from "react";



const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/reset-password", {
            method: 'POST',
            body: JSON.stringify({email: email}),
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    return (
        <div>
            <div>
                <h3>Reset your password.</h3>
                We will send you an email to reset your password
            </div>
            <form onSubmit={handleSubmit}>
            <input placeholder="Email Address" type="email"value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required ></input>
            </form>
            <button type="submit">Sumbit</button>
        </div>
    );
};

export default ResetPassword;