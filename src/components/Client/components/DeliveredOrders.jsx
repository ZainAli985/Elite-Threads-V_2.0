import React from "react";
import '../../utils/utility.css'
import './Delivered.css'

let DeliveredOrders = () => {
    return (
        <>
            <div className="deliveredOrdersContent flex">
                <div className="del-ord-txt g-t">
                    DELIVERED
                </div>
                <div className="delivered-orders-parent flex">
                    <div className="delivered-order flex">
                        <div className="delivered-order-material-container d-o-img">
                            <img src="/assets/cat-1.png" alt="ProductImg" />
                            <div className="d-o-info g-t bold w-300">
                                <p>PRODUCT NAME</p>
                                <p>QUANTITY</p>
                                <p>TOTAL PRICE</p>
                            </div>
                        </div>

                        <button className="reoder-btn">REORDER</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default DeliveredOrders;