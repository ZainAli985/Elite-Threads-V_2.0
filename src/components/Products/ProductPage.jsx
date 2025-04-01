import React, { useEffect, useState } from "react";
import ProductViewNav from "./ProductViewNav";
import "../utils/utility.css";
import "./ProductViewSection.css";
import { useNavigate, useParams } from "react-router-dom";
import API_BASE_URL from "../../../config/ApiBaseUrl";
const ProductPage = () => {

    const navigate = useNavigate();
    const product_id = useParams();
    const [ProductDetailsObj, setProductDetails] = useState();
    const [ProductTitle, setProductTitle] = useState('');
    const [ProductPrice, setProductPrice] = useState('');
    const [ProductImg, setProductImg] = useState('');
    const [ProductDesc, setProductDesc] = useState('');
    let [ProductQty, setProductQty] = useState(Number(1));
    const [DisplayProduct, setDisplayProduct] = useState();
    const username = localStorage.getItem('username');
    const ProductTotal = ProductQty * ProductPrice;
    const decryptedProductId = Number(product_id.product_id);


    const ProductDetails = async () => {
        try {
            let response = await fetch(`${API_BASE_URL}/productviewdata/${product_id.product_id}`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" }
            })
            if (response.ok) {
                const data = await response.json()
                setProductDetails(data);
            }
        }
        catch (e) {
            console.error(`Error In Product View ${e}`);
        }
    }
    useEffect(() => {
        ProductDetails();
    }, [product_id]);
    useEffect(() => {
        if (ProductDetailsObj) {
            setProductTitle(ProductDetailsObj.showcase_product.name);
            setProductPrice(ProductDetailsObj.showcase_product.price);
            setProductImg(ProductDetailsObj.showcase_product.image);
            setProductDesc(ProductDetailsObj.showcase_product.desc);
            // Creating A Custom Product W.R.T To Checkout Schema 
        }
        if (ProductTitle != '' && product_id != '' && ProductQty != '' && ProductPrice != '' && ProductImg != '' && ProductTotal != '') {
            setDisplayProduct(({
                ProductImg,
                decryptedProductId,
                ProductTitle,
                ProductPrice,
                ProductQty,
                ProductTotal
            }))
        }
    }, [ProductDetailsObj]);
    const handleProductQtyIncrease = () => {
        setProductQty(ProductQty + 1);
    }
    const handleProductQtyDecrease = () => {
        if (ProductQty > 1) {
            setProductQty(ProductQty - 1);
        }
    }
    const HandleCart = async () => {
        try {

            const response = await fetch(`${API_BASE_URL}/createproductviewcartproduct`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ProductName: ProductTitle,
                    username: username,
                    productqty: ProductQty
                })
            });
            if (response.ok) {
                const data = await response.json();
            }
        }
        catch (e) {
            console.error(`Error At Product Page Fetch Req ${e}`);
        }
    }

    const HandleBuyNow = async () => {
        try {
            // Doing This To Match The Key Values Name W.r.t To Schema 
            const formattedProduct = {
                image: DisplayProduct.ProductImg,
                product_id: DisplayProduct.decryptedProductId,
                name: DisplayProduct.ProductTitle,
                price: DisplayProduct.ProductPrice,
                qty: DisplayProduct.ProductQty,
                total: DisplayProduct.ProductTotal
            };
            const response = await fetch(`${API_BASE_URL}/checkout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    products: [formattedProduct]  //should be array w.r.t to schema
                })
            });
            if (response.ok) {
                const data = await response.json();
                window.location.href = '/checkout'
            }
        }
        catch (e) {
            console.error(`Error At Checking Out Display Product ${e}`)
        }
    }
    return (
        <>
            <ProductViewNav />
            <div className="p-v-parent">
                <div className="p-img-bg ">
                    <div className="p-v-img">
                        <img src={ProductImg} alt="Product Img" />
                    </div>
                </div>
                <div className="p-details-parent">
                    <div className="p-d-name g-t ">
                        <h2>{ProductTitle}</h2>
                    </div>
                    <div className="p-d-price g-t ">
                        <span>${ProductPrice}/-</span>
                    </div>
                    <div className="p-d-qty">
                        <span className="g-t">QTY:</span><i class="fa-solid fa-plus normal-icon " onClick={handleProductQtyIncrease}></i> <span id="qty-num-p-v">{ProductQty}</span> <i class="fa-solid fa-minus normal-icon" onClick={handleProductQtyDecrease}></i>
                    </div>
                    <div className="p-d-btns-parent ">
                        <button className="p-v-buynow" onClick={HandleBuyNow}>BUY NOW</button>
                        <button className="p-v-cart" onClick={HandleCart}>CART</button>
                    </div>
                    <div className="p-d-description ">
                        <p>{ProductDesc}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductPage;