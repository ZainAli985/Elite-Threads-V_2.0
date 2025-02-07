import React, { useEffect, useState } from "react";
import './TrackingPage.css'
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config/ApiBaseUrl";

function TrackingPage() {
    const [OrderedProducts, setOrderedProducts] = useState([]);
    const [netTotal, setnetTotal] = useState('')
    const navigate = useNavigate()
    function navigateHome() {
        navigate('/home')
    }
    async function FetchUserOrders(params) {

        try {
            const username = localStorage.getItem('username');
            const response = await fetch(`${API_BASE_URL}/trackorders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });
            const data = await response.json();
            if (response.ok) {
                // console.log(data);
                setOrderedProducts(data.OrderedProducts);
                setnetTotal(data.NetTotal)
            }
        }
        catch (err) {
            console.error(err);
        }

    }
    useEffect(() => {
        FetchUserOrders();
    }, [])
    return (
        <>
            <div className="tracking-header">
                <img src="/assets/logo.png" alt="" onClick={navigateHome} />
                <div className="net-total-container">
                    <h2>NET TOTAL<sub>(Incl Tax)</sub> : ${netTotal}/-</h2>
                </div>
            </div>


            <div className="user-orders">
                <h1>Orders</h1>

                {OrderedProducts.length > 0 ? (
                    OrderedProducts.map((order, index) => (
                        <div className="orders-container" key={index}>
                            <div className="p-img">
                                <img src={`http://39.52.37.193:3000${order.image}`} alt={order.name} />
                            </div>

                            <div className="p-details">
                                <span>QTY: {order.qty}</span>
                                <span>TOTAL: ${order.total}/-</span>
                            </div>

                            <div className="status-container">
                                <h2>
                                    Status: <strong>{order.status}</strong>
                                </h2>
                            </div>
                        </div>
                    ))
                ) : (
                    <p id="No-orders">No orders found.</p>
                )}
            </div>
        </>
    )
}

export default TrackingPage