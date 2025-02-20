import React, { useState, useEffect } from "react";
import "./OrdersPanel.css";
import API_BASE_URL from '../../../config/ApiBaseUrl.js';
import Notification from "../Notfication.jsx";

function AdminTrackingPanel() {
    const [orders, setOrders] = useState([]);
    const [expandedOrderId, setExpandedOrderId] = useState(null); // State to track expanded order
    const [notificationMessage, setnotificationMessage] = useState("");

    const fetchOrders = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/getuserorders`);
            if (!response.ok) {
                throw new Error("Failed to fetch orders");
            }
            const data = await response.json();
            console.log(data);
            setOrders(data.orders);
        } catch (err) {
            console.log(err);
        }
    };

    // Handle the status change
    const HandleStatusChange = async (username, product_id, status) => {
        try {
            const response = await fetch(`${API_BASE_URL}/updateorderstatus`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, product_id, status }),
            });

            const data = await response.json();
            if (response.ok) {
                showNotification('Product Status Changed Successfully');
                fetchOrders(); // Fetch the updated orders list after status change
            } else {
                alert(data.message || "Failed to change status");
            }
        } catch (err) {
            console.error("Error changing status", err);
        }
    };

    // Toggle the expanded order
    const toggleOrderDetails = (orderId) => {
        setExpandedOrderId((prevOrderId) => (prevOrderId === orderId ? null : orderId));
    };
    // Limited Timeout For Notification
    const showNotification = (message) => {
        setnotificationMessage(message);
        setTimeout(() => {
            setnotificationMessage(""); 
        }, 6000);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <>
            <div id="orders-page">
                <table>
                    <thead>
                        <tr>
                            <th>ORDER ID</th>
                            <th>USERNAME</th>
                            <th>EMAIL</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td>#{index + 1}</td>
                                    <td>{order.username}</td>
                                    <td>{order.email}</td>
                                    <td>
                                        <button onClick={() => toggleOrderDetails(order._id)}>
                                            {expandedOrderId === order._id ? "HIDE" : "VIEW"}
                                        </button>
                                    </td>
                                </tr>

                                {/* Only show product details if the order is expanded */}
                                {expandedOrderId === order._id && (

                                    <tr colSpan="4">
                                        <td>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>PRODUCT ID</th>
                                                        <th>PRODUCT NAME</th>
                                                        <th>QTY</th>
                                                        <th>NET TOTAL</th>
                                                        <th>STATUS</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {order.orders.products.map((product) => (
                                                        <tr key={product.product_id}>
                                                            <td>#{product.product_id}</td>
                                                            <td>{product.name}</td>
                                                            <td>{product.qty}</td>
                                                            <td>${product.total}/-</td>
                                                            <td>
                                                                <select
                                                                    value={product.status}
                                                                    onChange={(e) =>
                                                                        HandleStatusChange(
                                                                            order.username,
                                                                            product.product_id,
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="status"
                                                                >
                                                                    <option value="Under Process">Under Process</option>
                                                                    <option value="Handed Over To Shipper">Handed Over To Shipper</option>
                                                                    <option value="Out For Delivery">Out For Delivery</option>
                                                                    <option value="Delivered">Delivered</option>
                                                                </select>
                                                            </td>
                                                        </tr>

                                                    ))}
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>

                                )}
                                {expandedOrderId === order._id && (
                                    <tr>
                                        <td colSpan="5">
                                            <h5 className="shipping-address-h">Shipping Address:-</h5>
                                            <p className="shipping-details-p" >CITY: {order.shippingAddress.city} <br />
                                                COUNTRY: {order.shippingAddress.country} <br />
                                                POSTAL: {order.shippingAddress.postalCode} <br />
                                                ADDRESS: {order.shippingAddress.address} <br />
                                                LANDMARK: {order.shippingAddress.landmark}
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>

                        ))}
                    </tbody>
                </table>
                {notificationMessage && <Notification message={notificationMessage} />}
            </div>
        </>
    );
}

export default AdminTrackingPanel;
