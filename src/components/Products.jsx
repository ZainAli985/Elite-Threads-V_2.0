import React, { useEffect, useState } from 'react';
import './user-products.css';
import ProductNav from './ProductNav';
import { useParams } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState(null); // State for the notification message
    const { categoryName } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:3000/getproducts/${categoryName}`);
                const data = await response.json();
                setProducts(data.products);
            } catch (err) {
                console.error('Error fetching products:', err);
            }
        };

        fetchProducts();
    }, [categoryName]);

    const handleAddToCart = async (productName) => {
        const username = localStorage.getItem('username');
        try {
            const response = await fetch('http://127.0.0.1:3000/createcartproducts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: productName,
                    username: username,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setNotificationMessage(`${productName} Added To Cart!`); // Show notification on success
                setTimeout(() => {
                    setNotificationMessage(null); // Hide notification after 5 seconds
                }, 5000);
            } else {
                setNotificationMessage('Error adding product to cart.');
            }
        } catch (err) {
            console.error('Error adding product to cart:', err);
            setNotificationMessage('Error Adding Product To Cart.');
        }
    };

    return (
        <>
            <ProductNav />
            <div className="products-container-user">
                {products.map((product, index) => (
                    <div className="product-box" key={index}>
                        <div className="product-img">
                        <img src={`http://39.52.37.193:3000${product.image}`} alt={product.name} />

                        </div>
                        <div className="product-info">
                            <div className="price">
                                <h2>${product.price}/-</h2>
                                <img
                                    className="cart-logo"
                                    src="/assets/cart-logo.png"
                                    alt="Add to cart"
                                    onClick={() => handleAddToCart(product.name)}
                                />
                            </div>
                            <div className="product-title">
                                <h3>{product.name}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Notification */}
            {notificationMessage && (
                <div className="notification-div-cart">
                    {notificationMessage}
                </div>
            )}
        </>
    );
};

export default Products;
