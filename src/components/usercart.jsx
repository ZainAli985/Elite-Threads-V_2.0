import React, { useEffect, useState } from "react";
import './usercart.css'
import { useNavigate } from "react-router-dom";
import { set } from "mongoose";
// import '@fortawesome/fontawesome-free/css/all.min.css';

const UserCart = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [checkedProducts, setCheckedProducts] = useState({});
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [notification, setNotification] = useState('');
    const navigate = useNavigate();

    const fetchCart = async () => {
        try {
            const userName = localStorage.getItem('username');
            const response = await fetch('http://localhost:3000/getusercart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: userName }),
            });

            const data = await response.json();
            setCartProducts(data.products || []);
        } catch (err) {
            console.error("Error fetching cart:", err);
        }
    };
    useEffect(() => {
        fetchCart();
    }, []);

    const deleteProduct = async (productName, price) => {
        try {
            const userName = localStorage.getItem('username');
            const response = await fetch('http://localhost:3000/deletecartproduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: userName, productName: productName }),
            });

            const data = await response.json();
            if (response.ok) {
                setNotification(data.message);
                setTimeout(() => {
                    setNotification('')
                }, 8000);
                setCartProducts((prevProducts) => {
                    const updatedProducts = prevProducts.filter((product) => product.name !== productName);
                    return updatedProducts;
                });
                setSubtotal((prevSubtotal) => prevSubtotal - price);
            } else {
                console.error(`Error: ${data.message}`);
            }
        } catch (err) {
            console.error("Error deleting product:", err);
        }
    };
    // DIVIDING FUNCTIONS SEPERATELY SO THAT FRONTEND AND BACKEND CAN WORK SEPERATE AVOIDING UI BUGS
    const CartProductQuantity = async (productName, action) => {


        try {
            const userName = localStorage.getItem('username');
            const response = await fetch(`http://localhost:3000/${action}qty`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: userName, productName: productName }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                //  fetchCart();
            }

        }
        catch (err) {
            console.error("Error incrementing quantity:", err);
        }
    };
    // SEPERATE UI FUNCTIONS 
    const updateSubtotal = () => {
        let newSubtotal = 0;
        cartProducts.forEach(product => {
            if (checkedProducts[product.name]) {
                newSubtotal += product.price * product.qty;
            }
        });
        setSubtotal(newSubtotal);
    };
    // SUBTOTAL LIVE CALL 
    useEffect(() => {
        updateSubtotal();
    }, [cartProducts, checkedProducts]);

    // SEMICOLONS AND FUNCTION BRACKETS IN MAP THING END RE CHECK PERMISSIONS 
    const incrementQuantity = (productName) => {
        setCartProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.name === productName ? { ...product, qty: product.qty + 1 } : product

            )
        );
        CartProductQuantity(productName, 'increase');
    };
    const decreamentQuantity = (productName) => {
        setCartProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.name === productName && product.qty > 1 ? { ...product, qty: product.qty - 1 } : product
            )
        );
        CartProductQuantity(productName, 'decrease');
    };
    const handleCheckboxChange = (e, productName) => {
        const isChecked = e.target.checked;
        setCheckedProducts((prevProducts) => ({ ...prevProducts, [productName]: isChecked }));
    }
    // Checkout Page Handling 
    const SendCheckedOutProducts = async (selectedProducts) => {  
        try {
            const userName = localStorage.getItem('username');
            const response = await fetch('http://localhost:3000/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: userName, products: selectedProducts }),
            });
            if (response.ok) {
                const data = await response.json();
                // console.log(data.message);
            }
        }
        catch (err) {
            console.error("Error checking out:", err);
        }
    };
    const handleCheckout = () => {
        const selectedProducts = [];
        cartProducts.forEach(product => {
            if (checkedProducts[product.name]) {
                selectedProducts.push({
                    name: product.name,
                    price: product.price,
                    qty: product.qty,
                    total: product.price * product.qty, //PASSING IT FOR TOTAL ON CHECKOUT PAGE YEAAAAHHHH GOOOD MIIINNNNDDDD
                    product_id: product.product_id,
                    image: product.image,
                    status: product.status
                });
            }
        });
        if (selectedProducts.length === 0) {
            alert('SELECT ATLEAST  ONE PRODUCT TO CHECKOUT');
            return;
        }
        setSelectedProducts(selectedProducts);
        SendCheckedOutProducts(selectedProducts);
        navigate('/checkout');
    };
    return (
        <>
        <div className="user-cart">
            <div className="header">
                <h1>MY CART</h1>
            </div>
            <div className="cart-container">
                {cartProducts.length != 0 ? (
                    cartProducts.map((product, index) => (
                        <div key={index} className="cart-product">
                            <div className="cart-product-img">
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className="product-details">
                                <h2>${product.price}/-</h2>
                                <h2>{product.name}</h2>
                                <span id="qty">
                                    QTY:
                                    <i className="fa-solid fa-plus" id="increment" onClick={() => incrementQuantity(product.name, product.qty)}></i>
                                    {product.qty}
                                    <i className="fa-solid fa-minus" id="decrement" onClick={() => decreamentQuantity(product.name)}></i>
                                </span>
                            </div>
                            <div className="select-delete-container">
                                <img src="/assets/delete-logo.svg" alt="bin" onClick={() => deleteProduct(product.name, product.price)} />
                                <input
                                    type="checkbox"
                                    id="product-check"
                                    onChange={(e) => handleCheckboxChange(e, product.name, product.price, product.qty)}
                                    checked={checkedProducts[product.name] || false}
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
        {notification && (
                <div className="notification-div-cart">
                    <h3>{notification}</h3>
                </div>
            )}
        </>
        
    );
};

export default UserCart;