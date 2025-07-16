import React, { useState } from "react";
import "./RegisterForm.css";
import Navbar from './Navbar.jsx';
import API_BASE_URL from "../../../config/ApiBaseUrl.js";
import Notification from "../Notfication.jsx";

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notificationMessage, setnotificationMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { username, email, password };

        if (username !== '' && email !== '' && password !== '') {
            try {
                const response = await fetch(`${API_BASE_URL}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user),
                });
                if (response.ok) {
                    const newUser = await response.json();
                    // console.log('User Created', newUser);

                    // Clear form fields after successful registration
                    setUsername('');
                    setEmail('');
                    setPassword('');

                    // Show success notification
                    setnotificationMessage("REGISTERED SUCCESSFULLY! LOG IN");
                    setTimeout(() => {
                        setnotificationMessage('')
                    }, 6000);
                } else {
                    setnotificationMessage("REGISTRATION FAILED! RETRY");
                    setTimeout(() => {
                        setnotificationMessage('')
                    }, 6000);
                }
            } catch (err) {
                console.log(err);
                setnotificationMessage("AN ERROR OCCURED PLEASE TRY AGAIN"); // Error notification
                setTimeout(() => {
                    setnotificationMessage('')
                }, 6000);
            }
        } else {
            setnotificationMessage("PLEASE FILL REQUIRED INFO!"); // Error notification for empty fields
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
                    <h1>REGISTER NOW</h1>
                </div>
                <form id="RegisterForm" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="User Name"
                        className="inputs"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
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
                        value="Register"
                        className="RegisterBtn"
                    />
                </form>
            </div>

            {/* Notification */}
            {notificationMessage && <Notification message={notificationMessage} />}

        </>
    );
}

export default RegisterForm;
