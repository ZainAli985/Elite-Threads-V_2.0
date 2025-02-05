import React, { useEffect, useState } from 'react';
import './admininfo.css';
import './admin.css';

function AdminInfo() {
    const [adminInfo, setAdminInfo] = useState(null);

    useEffect(() => {
        // Retrieve admin info from localStorage
        const storedAdminInfo = localStorage.getItem('adminInfo');
        if (storedAdminInfo) {
            setAdminInfo(JSON.parse(storedAdminInfo));
        }
    }, []);

    if (!adminInfo) {
        return <p>Loading admin information...</p>;
    }

    return (
        <div className="admininfo">
            <h1>ADMIN'S PROFILE</h1>
            <div className="info-container">
                <div className="userlogo">
                    <img src="/assets/userlogo.png" alt="User Logo" />
                </div>
                <div className="infoboxes">
                    <div className="infobox">
                        <h2>ID: {adminInfo.admin_id}</h2>
                        
                    </div>
                    <div className="infobox">
                        <h2>USERNAME: {adminInfo.username}</h2>
                        
                    </div>
                    <div className="infobox">
                        <h2>EMAIL: {adminInfo.email}</h2>
                        
                    </div>
                    <div className="infobox">
                        <h2>PASSWORD: {adminInfo.password}</h2>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminInfo;
