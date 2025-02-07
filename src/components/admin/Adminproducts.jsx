import React, { useEffect, useState } from "react";
import "./products.css";
import API_BASE_URL from '../../../config/ApiBaseUrl.js';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState("");

  // Fetch products from the API
  const getProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/getAdminproducts`);
      const data = await response.json();
      setProducts(data.products || []); // Set products from the API response
    } catch (e) {
      console.error("Error fetching products:", e);
      showNotification("Error fetching products. Please try again.");
    }
  };

  // Show notification for a limited time
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(""); // Clear the notification after 3 seconds
    }, 3000);
  };

  // Handle product deletion
  const deleteProduct = async (productName) => {
    try {
      const response = await fetch(`${API_BASE_URL}/deleteproducts`, {
        method: "POST", // or "DELETE", depending on your backend setup
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: productName }), // Sending product name
      });

      const result = await response.json();

      if (response.ok) {
        showNotification(`Product "${productName}" deleted successfully!`);
        // Remove the deleted product from the state
        setProducts(products.filter((product) => product.name !== productName));
      } else {
        showNotification(`Error deleting product: ${result.message}`);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      showNotification("An error occurred while deleting the product.");
    }
  };

  // Use useEffect to fetch products on component mount
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="admin-products-container">
      {/* Notification div */}
      {notification && <div className="notification">{notification}</div>}

      {/* Message if no products are available */}
      {products.length === 0 ? (
        <h3 className="no-products-message">No products available to display.</h3>
      ) : (
        <div className="products-container">
          {products.map((product, index) => (
            <div
              key={index}
              className="product-box"
              onClick={() => deleteProduct(product.name)}
            >
              <div className="product-img">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <div className="price">
                  <h2>${product.price}/-</h2>
                </div>
                <div className="product-title">
                  <h3>{product.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
