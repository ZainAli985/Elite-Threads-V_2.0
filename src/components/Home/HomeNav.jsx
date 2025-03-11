import React from "react";
import { useRef } from "react";
import './HomeNav.css'
import { useNavigate } from "react-router-dom";
import { useState } from "react";



function HomeNav() {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const timeoutRef = useRef(null)

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
    
        window.history.replaceState(null, "", "/login");
        window.location.href = "/login";
    };
    

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setShowDropdown(true)
    };
    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setShowDropdown(false);
        }, 100);
    };

    function navigateCart() {
        navigate('/usercart');
    }
    function navigateTrackOrder() {
        navigate('/trackorders');
    }

    return (
        <>
            <nav id="nav">
                <div className="logo">
                    <img src="/assets/Logo.png" alt="Logo" />
                </div>
                <div className="essential-box">
                    <div className="search">
                        <input type="search" name="" id="" placeholder="Search For Your Look" />
                        <img src="/assets/search-logo.png" alt="Search Logo" srcset="" />
                    </div>
                    <div className="cart">
                        <img src="/assets/cart-logo.png" alt="Cart-Logo" onClick={navigateCart} />
                    </div>
                    <div className="user-dropdown-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <div className="user-profile" >
                            <img src="/assets/userlogo.png" alt="User-Logo" />
                        </div>
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <a className="dropdown-options" href="">
                                    <div className="option-icon">
                                        <img src="/assets/userlogo-black.png" alt="User-Logo" />
                                    </div>
                                    <p>PROFILE</p>
                                </a>
                                <a className="dropdown-options" onClick={navigateTrackOrder}>
                                    <div className="option-icon">
                                        <img src="/assets/package.png" alt="Package" />
                                    </div>
                                    <p>ORDERS</p>
                                </a>
                                <a className="dropdown-options" href="" onClick={handleLogout}>
                                    <div className="option-icon">
                                        <img src="/assets/logout.png" alt="Log Out" />
                                    </div>
                                    <p>LOGOUT</p>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default HomeNav;