import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./LoginForm.css";
import Navbar from './Navbar.jsx';
import API_BASE_URL from "../../../config/ApiBaseUrl.js";
import Notification from "../Notfication.jsx";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notificationMessage, setnotificationMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { email, password };
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
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
                setnotificationMessage("LOGIN SUCCESSFUL"); // Success notification
                setTimeout(() => {
                    setnotificationMessage('')
                }, 6000);
                navigate('/home'); // Redirect to home page
            } else {
                setnotificationMessage("LOGIN FAILED");
                setTimeout(() => {
                    setnotificationMessage('')
                }, 6000);
            }
        } catch (err) {
            console.log(err);
            setnotificationMessage("AN ERROR OCCURED! TRY AGAIN");
            setTimeout(() => {
                setnotificationMessage('')
            }, 6000);
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
            {notificationMessage && <Notification message={notificationMessage} />}

        </>
    );
}

export default LoginForm;
