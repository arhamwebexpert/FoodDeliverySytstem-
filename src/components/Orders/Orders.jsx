import React, { useState, useEffect } from "react";
import "./Orders.css";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Please log in to view orders");
            }

            const response = await fetch("http://localhost:5000/api/orders", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch orders");
            }

            const data = await response.json();
            setOrders(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `http://localhost:5000/api/orders/${orderId}/cancel`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to cancel order");
            }

            // Refresh orders list
            fetchOrders();
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div className="orders-loading">Loading orders...</div>;
    }

    if (error) {
        return <div className="orders-error">{error}</div>;
    }

    if (orders.length === 0) {
        return <div className="orders-empty">No orders found</div>;
    }

    return (
        <div className="orders-container">
            <h2>Order History</h2>
            <div className="orders-list">
                {orders.map((order) => (
                    <div key={order._id} className="order-card">
                        <div className="order-header">
                            <div className="order-info">
                                <span className="order-date">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </span>
                                <span className={`order-status ${order.status}`}>
                                    {order.status}
                                </span>
                            </div>
                            {order.status === "pending" && (
                                <button
                                    className="cancel-button"
                                    onClick={() => handleCancelOrder(order._id)}
                                >
                                    Cancel Order
                                </button>
                            )}
                        </div>

                        <div className="order-items">
                            {order.items.map((item) => (
                                <div key={item._id} className="order-item">
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="item-image"
                                    />
                                    <div className="item-details">
                                        <h4>{item.product.name}</h4>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Price: ${item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="order-summary">
                            <div className="summary-row">
                                <span>Total Amount:</span>
                                <span>${order.totalAmount.toFixed(2)}</span>
                            </div>
                            <div className="shipping-address">
                                <h4>Shipping Address:</h4>
                                <p>{order.shippingAddress.street}</p>
                                <p>
                                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                                    {order.shippingAddress.zipCode}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders; 