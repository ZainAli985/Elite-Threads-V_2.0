import React from "react";
import './HomeNav.css'
import { useNavigate, useParams } from "react-router-dom";



function ProductNav(catgName) {
    const {categoryName} = useParams();
    const navigate = useNavigate();
    function navigateCart() {
        navigate('/usercart');
    }
    return (
        <>
            <nav id="nav">
                <div class="logo">
                    <img src="/assets/Logo.png" alt="Logo" />
                </div>
                <div class="essential-box">
                    <div class="search">
                        <input type="search" name="" id="" placeholder="Search For Your Look" />
                        <img src="/assets/search-logo.png" alt="" srcset="" />
                    </div>
                    <div class="cart">
                        <img src="/assets/cart-logo.png" alt=""  onClick={navigateCart}/>
                    </div>
                </div>
            </nav>
            <div class="product-header">
                <h1>{categoryName}</h1>
            </div>
            <hr class="hr" />
        </>
    )
}

export default ProductNav;