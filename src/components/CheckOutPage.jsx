import React, { useEffect, useState } from "react";
import './checkoutpage.css';
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config/ApiBaseUrl";

function CheckoutBox() {
    const [total, setTotal] = useState(0);
    const [shipmentCharge, setShipmentCharge] = useState(0);
    const [gst, setGst] = useState(0);
    const [netTotal, setNetTotal] = useState(0);

    // Shipping INfo 
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const [postalCode, setPostalCode] = useState('');

    // Notification 
    const [notification, setNotification] = useState('');

    const navigate = useNavigate()

    // Sending Shipping Data 
    const sendShippingData = async (e) => {
        e.preventDefault();
        const shippingData = { country, city, address, landmark, postalCode };
        
        try {
            const username = localStorage.getItem('username');
            const response = await fetch(`${API_BASE_URL}/placeorder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, shippingData }),
            });
            const data = await response.json();
            if (response.ok) {
                setNotification("Placing Order Please Be Patient");

                // Hide notification after 3 seconds
                setTimeout(() => {
                    setNotification(''); 
                    navigate('/orderconfirmation')
                }, 7000);
            }

        }
        catch (err) {
            console.error("Error:", err);
        }
    };

    // Net Total Function 
    async function getNetTotal() {
        try {
            const username = localStorage.getItem('username');
            const response = await fetch(`${API_BASE_URL}/placeorder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });

            const data = await response.json();
            if (response.ok) {

                // Default Notification 
                setNotification('PLEASE PROCEED WITH YOUR ORDER IN 30 MINS ELSE IT WILL BE CANCELLED AUTOMATICALLY');

                setTimeout(() => {
                    setNotification('');
                }, 8000);
                setTotal(data.total || 0);
                setShipmentCharge(data.shipmentCharge || 0);
                setGst(data.gst || 0);
                setNetTotal(data.netTotal || 0);

                setCountry(data.shippingAddress.country || '');
                setCity(data.shippingAddress.city || '');
                setAddress(data.shippingAddress.address || '');
                setLandmark(data.shippingAddress.landmark || '');
                setPostalCode(data.shippingAddress.postalCode || '');
            } else {
                console.error("Error:", data.message);
            }
        }
        catch (err) {
            console.error("Error fetching cart:", err);
        }
    }

    useEffect(() => {
        getNetTotal();
        const timeout = setTimeout(() => {
            getNetTotal(); //REFETCHING SAME FUNCTION SO THE UI RELAODS IN ORDER TO SHOW CORRECT VALUES
        }, 1000);  //USED TIMEOUT INSTEAD OF INTERVAL SO IT COULD ONLY RUN ONCE DUE TO NOTIFICATION BUG
        return ()=> clearInterval(timeout);
    }, []);

    return (
        <>
            <div className="checkout-header">
                <h1>CHECKOUT</h1>
            </div>
            <div className="checkout-container">
                <div className="address-container">
                    <h3>SHIPPING ADDRESS</h3>
                    <form className="shipping-details-form">
                        <input type="text" placeholder="COUNTRY" value={country} onChange={(e) => setCountry(e.target.value)} />
                        <input type="text" placeholder="CITY" value={city} onChange={(e) => setCity(e.target.value)} />
                        <textarea placeholder="ADDRESS" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                        <input type="text" placeholder="LANDMARK" value={landmark} onChange={(e) => setLandmark(e.target.value)} /><br />
                        <input type="text" placeholder="POSTAL CODE" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                    </form>
                </div>
                <div className="total-container">
                    <div className="charges">
                        <h5>BILL: ${total}/-</h5>
                    </div>
                    <div className="charges">
                        <h5>SHIPPING: ${shipmentCharge}/-</h5>
                    </div>
                    <div className="charges">
                        <h5>GST%: ${gst.toFixed(2)}/-</h5>
                    </div>
                    <div className="net-total">
                        <h3>NET TOTAL: ${netTotal}/-</h3>
                    </div>
                </div>
                <div className="place-order-btn">
                    <button onClick={sendShippingData}>PLACE ORDER</button>
                </div>
            </div>
            {notification && (
                <div className="notification-div">
                    <h3>{notification}</h3>
                </div>
            )}
        </>
    );
}

export default CheckoutBox;
