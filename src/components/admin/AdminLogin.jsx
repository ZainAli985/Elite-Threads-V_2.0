import React, { useState, } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import AdminNavLogin from "./AdminNavLogin";
import API_BASE_URL from "../../../config/ApiBaseUrl";
import Notification from "../Notfication";

function AdminLoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [admin_id, setID] = useState('');
    const [notificationMessage, setnotificationMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation for empty fields
        if (!email || !password || !admin_id) {
            setnotificationMessage("PLEASE FILL ALL FIELDS");
            setTimeout(() => {
                setnotificationMessage('')
            }, 6000);
            return;
        }

        const user = { email, password, admin_id };
        try {
            const response = await fetch(`${API_BASE_URL}/adminlogin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                const adminInfo = data.adminInfo
                console.log(data)

                // Items Set In Local Storage 
                localStorage.setItem('token', token);
                localStorage.setItem('adminInfo', JSON.stringify(adminInfo));

                // Notification Handling 
                setnotificationMessage("LOGIN SUCCESSFULL");
                setTimeout(() => {
                    setnotificationMessage('')
                }, 6000);
                navigate('/adminpanel');
            } else {
                const error = await response.json();
                setnotificationMessage("LOGIN FAILED");
                setTimeout(() => {
                    setnotificationMessage('')
                }, 6000);
            }
        } catch (err) {
            console.error(err);
            setnotificationMessage("ERROR OCCURED PLEASE TRY AGAIN");
            setTimeout(() => {
                setnotificationMessage('')
            }, 6000);
        }
    };

    return (
        <>
           <AdminNavLogin/>
            <div className="form">
                <div className="text-box">
                    <div className="loginicon">
                        <img src="/assets/LoginIcon.png" alt="Login Icon" />
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
                        type="password"
                        placeholder="Admin ID"
                        className="inputs"
                        value={admin_id}
                        onChange={(e) => setID(e.target.value)}
                    />
                    <input
                        type="submit"
                        value="Log In"
                        className="RegisterBtn"
                    />
                </form>
                <h3 style={{
                    padding: '20px',
                    backgroundColor: '#f70101',
                    color: '#fadd8a',
                    border: '1px solid #f70101',
                    borderRadius: '5px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    margin: '20px auto',
                    width: 'fit-content',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                }}>
                    ONLY FOR ADMINS
                </h3>
            </div>

            {notificationMessage && <Notification message={notificationMessage} />}
        </>
    );
}

export default AdminLoginForm;
