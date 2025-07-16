import React from "react";
import './Notification.css';

function Notification({ message } /*Destructure From Params */) {
    return (
        <>
            <div className="notification-div-g">
                {message}
            </div>
        </>
    );
}

export default Notification;
