import React from "react";
import { useNavigate } from "react-router-dom";
import './lastpage.css'

function LastPage(){
    const navigate = useNavigate();

    function handleHomeNavigation(){
        navigate('/home')
    }
    function handleTrackOrderNavigation(){
        navigate('/trackorders')
    }
    return(
        <>
        <div className="last-header">
            <img src="../src/assets/logo.png" alt="LOGO" />
        </div>
        <div className="outro-content">
            <div className="check-mark">
                <img src="../src/assets/checkmark.png" alt="CheckMark" />
            </div>
            <div className="outro-text">
                <h2>ORDER PLACED SUCCESSFULLY</h2>
                <h1>THANK YOU FOR SHOPPING WITH US</h1>
            </div>
            <div className="redirecting-btns">
                <button onClick={handleHomeNavigation}>
                    HOME
                </button>
                <button onClick={handleTrackOrderNavigation}>
                    TRACK ORDER
                </button>
            </div>
        </div>

        </>
    )
}

export default LastPage;