import React, { useEffect, useState } from "react";
import './usercart.css'
import { useNavigate } from "react-router-dom";
import Notification from "../Notfication";
import API_BASE_URL from "../../../config/ApiBaseUrl";
import '../utils/utility.css'
import Loader from "../utils/Loader";

const UserCart = () => {
    const userName = localStorage.getItem('username');
    const [cartProducts, setCartProducts] = useState([]);
    const [selectedProducts, setselectedProducts] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [notificationMessage, setnotificationMessage] = useState("");
    const [showLoader, setShowLoader] = useState(true);
    const navigate = useNavigate();

    // Fetching Cart Data From Server  (Fetches Basic Cart Products To Show Case Them)
    const fetchCart = async () => {
        try {
            const userName = localStorage.getItem('username');
            const response = await fetch(`${API_BASE_URL}/getusercart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: userName }),
            });
            if (response.ok) {
                const data = await response.json();
                setCartProducts(data.products || []);
                setShowLoader(false);
            }
        } catch (err) {
            console.error("Error fetching cart:", err);
        }
    };
    useEffect(() => {
        fetchCart();
    }, []);

    // Deleting Product Request Using Username And Product Details (Optimized By Server Use)
    const deleteProduct = async (productName, price) => {
        try {
            const userName = localStorage.getItem('username');
            const response = await fetch(`${API_BASE_URL}/deletecartproduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: userName, productName: productName }),
            });

            const data = await response.json();
            if (response.ok) {
                const UpdatedCart = data.UpdatedCart;
                setnotificationMessage(data.message);
                setTimeout(() => {
                    setnotificationMessage('')
                }, 6000);
                if (UpdatedCart) {
                    setCartProducts(UpdatedCart);
                }
                setSubtotal((prevSubtotal) => prevSubtotal - price);
            } else {
                console.error(`Error: ${data.message}`);
            }
        } catch (err) {
            console.error("Error deleting product:", err);
        }
    };

    // Increament/Decreament Qty Function (Optimized)
    const increaseqty = async (productName, productPrice) => {
        try {
            const response = await fetch(`${API_BASE_URL}/increaseqty`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName: userName, productName: productName })
            });
            setCartProducts((prevProducts) => prevProducts.map(product =>
                product.name === productName ? { ...product, qty: product.qty + 1 } :
                    product
            ));
            // Change Subtotal Only For Selected Products 
            const selectedProduct = selectedProducts.find((product) => product.name === productName);
            if (selectedProduct && selectedProduct != undefined && selectedProduct != null) {
                setSubtotal((prevSub) => prevSub + productPrice);
            }
        } catch (err) {
            console.error(err);
        }

    };
    const decreaseqty = async (productName, productPrice) => {

        try {
            const response = await fetch(`${API_BASE_URL}/decreaseqty`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName: userName, productName: productName })
            });
            if (response.ok) {
                setCartProducts((prevProducts) => prevProducts.map(product =>
                    product.name === productName ? { ...product, qty: product.qty > 1 ? product.qty - 1 : product.qty } :
                        product
                ));
                // Change Subtotal Only For Selected Products 
                const selectedProduct = selectedProducts.find((product) => product.name === productName);
                if (selectedProduct && selectedProduct != undefined && selectedProduct != null) {
                    setSubtotal((prevSub) => prevSub - productPrice);
                }
            }
        } catch (err) {
            console.error(err);
        }

    };
    // Checked Unchecked Products (W.R.T SUBTOTAL AND SELECTED PRODUCTS LOGIC)
    const handleCheck = (e, Product) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setselectedProducts((prevProducts) =>
                [...prevProducts, Product]
            );
            setSubtotal((prevSub) => prevSub + Product.price * Product.qty);
        } else {
            setselectedProducts((prev) =>
                prev.filter(p => p.name !== Product.name)
            );
            setSubtotal((prevSub) => prevSub - Product.price * Product.qty);
        }
    };
    // Sends Selected Products To Backend For Further Proceedings 
    const SendCheckedOutProducts = async (FilteredCheckedOutProducts) => {
        try {
            const userName = localStorage.getItem('username');
            const response = await fetch(`${API_BASE_URL}/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: userName, products: FilteredCheckedOutProducts }),
            });
            if (response.ok) {
                const data = await response.json();
            }
        }
        catch (err) {
            console.error("Error checking out:", err);
        }
    };
    // PUSHSES FINAL CHECKED PRODUCTS INTO AN ARRAY BY FILTERING THEM FOR USEFUL INFO 
    const handleCheckout = () => {
        const FilteredCheckedOutProducts = [];
        selectedProducts.forEach(product => {
            FilteredCheckedOutProducts.push({
                image: product.image,
                product_id: product.product_id,
                name: product.name,
                price: product.price,
                qty: product.qty,
                total: product.price * product.qty,
                status: product.status /*It'll automatically go for default in the backend*/
            });
        });
        if (selectedProducts.length === 0) {  /*Zero || Null Error Handling*/ 
            alert('SELECT ATLEAST  ONE PRODUCT TO CHECKOUT');
            return;
        }
        SendCheckedOutProducts(FilteredCheckedOutProducts); //API FUNCTION CALL
        navigate('/checkout');
    };

    return (
        showLoader ? <Loader /> : (
            <>
                <div className="user-cart">
                    <div className="header">
                        <h1 className="g-t">MY CART</h1>
                    </div>
                    <div className="cart-container">
                        {cartProducts.length != 0 ? (
                            cartProducts.map((product, index) => (
                                <div key={index} className="cart-product">
                                    <div className="cart-product-img">
                                        <img src={`${product.image}`} alt={product.name} />
                                    </div>
                                    <div className="product-details">
                                        <h2>${product.price}/-</h2>
                                        <h2>{product.name}</h2>
                                        <span id="qty">
                                            <span>
                                                QTY:
                                            </span>
                                            <i className="fa-solid fa-plus" id="increment" onClick={() => increaseqty(product.name, product.price)}></i>
                                            <span className="qty-number">{product.qty}</span>
                                            <i className="fa-solid fa-minus" id="decrement" onClick={() => decreaseqty(product.name, product.price)}></i>
                                        </span>
                                    </div>
                                    <div className="select-delete-container">
                                        <img src="/assets/delete-logo.svg" alt="bin" onClick={() => deleteProduct(product.name, product.price)} />
                                        <input
                                            type="checkbox"
                                            id="product-check"
                                            onChange={(e) => handleCheck(e, product)}
                                        />
                                    </div>
                                </div>
                            ))
                        ) : <h1 className="default-cart-message">No Products In Cart</h1>
                        }
                    </div>
                    <div className="checkout-box">
                        <div className="subtotal-price">
                            <span id="subtotal">SUBTOTAL: ${subtotal.toFixed(2)}/-</span>
                        </div>
                        <div className="checkout-btn-container">
                            <button type="button" className="checkout-btn" onClick={handleCheckout}>
                                CHECKOUT
                            </button>
                        </div>
                    </div>
                </div>
                {notificationMessage && <Notification message={notificationMessage} />} {/*Notification Element*/}
            </>
        )
    );
};

export default UserCart;