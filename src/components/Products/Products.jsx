import React, { useEffect, useState } from 'react';
import './user-products.css';
import ProductNav from './ProductNav';
import { useNavigate, useParams } from 'react-router-dom';
import API_BASE_URL from '../../../config/ApiBaseUrl';
import Notification from '../Notfication';
import Loader from '../utils/Loader';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [notificationMessage, setnotificationMessage] = useState("");
    const [showLoader, setShowLoader] = useState(true);
    const { categoryName } = useParams();
    const navigate = useNavigate()

    function handleProductViewNavigation(product_id){
        navigate(`/Productview/${product_id}`)
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/getproducts/${categoryName}`);
                const data = await response.json();
                if(response.ok){
                    setProducts(data.products);
                    setShowLoader(false)
                }
            } catch (err) {
                console.error('Error fetching products:', err);
            }
        };

        fetchProducts();
    }, [categoryName]);

    const handleAddToCart = async (productName) => {
        const username = localStorage.getItem('username');
        try {
            const response = await fetch(`${API_BASE_URL}/createcartproducts`, {
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
                setnotificationMessage(`PRODUCT ADDED TO CART SUCCESSFULLY`);
                setTimeout(() => {
                    setnotificationMessage("");
                }, 6000);
            } else {
                setnotificationMessage('ERROR ADDING THE PRODUCT');
            }
        } catch (err) {
            console.error('Error adding product to cart:', err);
            setnotificationMessage('ERROR ADDING THE PRODUCT TO CART');
        }
    };

    return (
        showLoader ? <Loader/> : (
        <>
            <ProductNav />
            <div className="products-container-user">
                {products.map((product, index) => (
                    <div className="product-box" key={index} onClick={()=> handleProductViewNavigation(product.product_id)} >
                        <div className="product-img">
                            <img src={`${product.image}`} alt={product.name} />

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
            {notificationMessage && <Notification message={notificationMessage} />}

        </>
        )
    );
};

export default Products;
