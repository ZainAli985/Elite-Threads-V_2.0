import React from "react";
import ProductViewNav from "./ProductViewNav";
import "../utils/utility.css";
import "./ProductViewSection.css";

const ProductPage = ()=>{
    return(
        <>
        <ProductViewNav/>
        <div className="p-v-parent">
            <div className="p-img-bg ">
                <div className="p-v-img">
                    <img src="/assets/cat-2.png" alt="Product Img"  />
                </div>
            </div>
            <div className="p-details-parent">
                <div className="p-d-name g-t ">
                    <h2>Product Name</h2>
                </div>
                <div className="p-d-price g-t ">
                    <span>$600/-</span>
                </div>
                <div className="p-d-qty">
                    <span className="g-t">QTY:</span><i class="fa-solid fa-plus normal-icon "></i> <span id="qty-num-p-v">5</span> <i class="fa-solid fa-minus normal-icon  "></i>
                </div>
                <div className="p-d-btns-parent ">
                    <button className="p-v-buynow">BUY NOW</button>
                    <button className="p-v-cart">CART</button>
                </div>
                <div className="p-d-description ">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi velit doloribus qui nulla adipisci quis eos animi corporis, reprehenderit in? Aut inventore nihil labore ipsum, praesentium atque nesciunt voluptas incidunt.</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default ProductPage;