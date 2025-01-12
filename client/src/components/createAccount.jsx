import '../style/createacc.css';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const CreateAccount = () => {
    const { createProfile } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [last_name, setLastName] = useState("");
    const [first_name, setFirstName] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirmation) {
            setError({ error: "Passwords do not match." });
            return;
        }

        try {
            const profile = await createProfile(email, password, last_name, first_name);
            console.log(profile);
            if (!profile) {
                setPassword("");
                setPasswordConfirmation("");
                setEmail("");
                setLastName("");
                setFirstName("");
                navigate('/register');
                return;
            }
            navigate('/profile');
        } catch (error) {
            console.error("Error registering", error);
            alert('Registration failed');
        }
    };

    const validatePasswords = () => {
        if (password.length < 8) {
            setError({ error: "Password must be 8 or more characters." });
        } else if (password !== passwordConfirmation) {
            setError({ error: "Passwords do not match." });
        } else {
            setError(null);
        }
    };

    return (
        <div className="mainContainer">
            <form className="register-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="First Name" 
                    value={first_name} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Last Name" 
                    value={last_name} 
                    onChange={(e) => setLastName(e.target.value)} 
                    required 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyUp={validatePasswords}
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={passwordConfirmation} 
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    onKeyUp={validatePasswords} 
                    required 
                />
                {error && <p className="error-message">{error.error}</p>}
                <button type="submit" disabled={error}>Submit</button>
            </form>
        </div>
    );
};

export default CreateAccount;
