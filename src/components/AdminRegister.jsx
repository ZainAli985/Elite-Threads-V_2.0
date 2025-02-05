import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";
import AdminNav from './AdminNav'

function AdminRegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' }); // State for notifications
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { username, email, password };

        if (username !== '' && email !== '' && password !== '') {
            try {
                const response = await fetch('http://localhost:3000/adminregister', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user),
                });
                if (response.ok) {
                    const newUser = await response.json();

                    const adminInfo = newUser.adminInfo;

                    localStorage.setItem('adminInfo', JSON.stringify(adminInfo));

                    // Clear form fields after successful registration
                    setUsername('');
                    setEmail('');
                    setPassword('');

                    // Show success notification
                    setNotification({ message: 'User Created Successfully! LOG IN', type: 'success' });
                    navigate('/Adminpanel')
                } else {
                    setNotification({ message: 'Registration Failed. Try Again.', type: 'error' }); // Error notification
                }
            } catch (err) {
                console.log(err);
                setNotification({ message: 'An error occurred. Please try again later.', type: 'error' }); // Error notification
            }
        } else {
            setNotification({ message: 'Please fill in all fields.', type: 'error' }); // Error notification for empty fields
        }
    };

    return (
        <>
            <AdminNav />
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

            {/* Notification */}
            {notification.message && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
        </>
    );
}

export default AdminRegisterForm;
