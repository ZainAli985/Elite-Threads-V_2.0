import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./LoginForm.css";
import Navbar from './Navbar.jsx';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' }); // New state for notification
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { email, password };
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                const data = await response.json();
                let token = data.token;
                let username = data.username;
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
                setNotification({ message: 'Login Successful!', type: 'success' }); // Success notification
                navigate('/home'); // Redirect to home page
            } else {
                setNotification({ message: 'Login Failed. Please check your credentials.', type: 'error' }); // Error notification
            }
        } catch (err) {
            console.log(err);
            setNotification({ message: 'An error occurred. Please try again.', type: 'error' }); // Error notification
        }
    };

    return (
        <>
        <Navbar />
            <div className="form">
                <div className="text-box">
                    <div className="loginicon">
                        <img src="/assets/LoginIcon.png" alt="" />
                    </div>
                    <h1>Log In</h1>
                </div>
                <form id="RegisterForm" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="inputs"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="inputs"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="submit"
                        value="Log In"
                        className="RegisterBtn"
                    />
                </form>
            </div>

            {/* Notification */}
            {notification.message && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
        </>
    );
}

export default LoginForm;
