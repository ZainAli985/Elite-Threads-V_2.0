import React from "react";
import './HomeNav.css'
import { useNavigate } from "react-router-dom";



function HomeNav() {
    const navigate = useNavigate();
    function navigateCart() {
        navigate('/usercart');
    }
    function navigateTrackOrder() {
        navigate('/trackorders');
    }

    return (
        <>
            <nav id="nav">
                <div class="logo">
                    <img src="/assets/Logo.png" alt="Logo" onClick={navigateTrackOrder} />
                </div>
                <div class="essential-box">
                    <div class="search">
                        <input type="search" name="" id="" placeholder="Search For Your Look" />
                        <img src="/assets/search-logo.png" alt="Search Logo" srcset="" />
                    </div>
                    <div class="cart">
                        <img src="/assets/cart-logo.png" alt="Cart-Logo" onClick={navigateCart} />
                    </div>
                </div>
            </nav>
        </>
    )
}

export default HomeNav;