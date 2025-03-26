import React, { useState, useEffect } from "react";
import API_BASE_URL from "../../../config/ApiBaseUrl";
import '../utils/utility.css'

const ProductList = () => {
    const [products, setProducts] = useState([]);

    // Fetch products from API
    const loadProducts = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/products`);
            const data = await response.json();

            if (response.ok) {
                setProducts(data.products);
            } else {
                console.error("Failed to fetch products.");
            }
        } catch (error) {
            console.error("Error loading products:", error);
        }
    };

    // Load products on component mount
    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <div className="products-container" id="products-container">
            <h2>Products</h2>
            <div className="product-cards">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="product-card">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.desc}</p>
                            <div className="price">${product.price}</div>
                        </div>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;
