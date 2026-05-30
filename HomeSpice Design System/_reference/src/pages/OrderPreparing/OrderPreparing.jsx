import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './OrderPreparing.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { useContext } from 'react';

const OrderPreparing = () => {
    const [progress, setProgress] = useState(0);
    const [orderDetails, setOrderDetails] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { food_list } = useContext(StoreContext);

    useEffect(() => {
        const fetchLatestOrder = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Please login to view order status');
                }

                const response = await fetch('http://localhost:5000/api/orders/latest', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    if (response.status === 404) {
                        setError('No active orders found');
                        setLoading(false);
                        return;
                    }
                    throw new Error('Failed to fetch order details');
                }

                const data = await response.json();
                setOrderDetails(data);

                // If order is already completed, set progress to 100
                if (data.status === 'delivered') {
                    setProgress(100);
                    setIsCompleted(true);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        // If order details are passed through location state, use those
        if (location.state?.order) {
            setOrderDetails(location.state.order);
            setLoading(false);
        } else {
            // Otherwise fetch the latest order
            fetchLatestOrder();
        }

        // Simulate order preparation progress
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setIsCompleted(true);
                    return 100;
                }
                return prev + 10;
            });
        }, 2000);

        return () => clearInterval(timer);
    }, [location.state]);

    const getItemDetails = (itemId) => {
        return food_list.find(item => item._id === itemId);
    };

    if (loading) {
        return (
            <div className="order-preparing">
                <div className="preparing-container">
                    <div className="loading-message">Loading order details...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="order-preparing">
                <div className="preparing-container">
                    <div className="error-message">{error}</div>
                    <button
                        className="back-button"
                        onClick={() => navigate('/')}
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    if (!orderDetails) {
        return (
            <div className="order-preparing">
                <div className="preparing-container">
                    <div className="no-order-message">No active orders found</div>
                    <button
                        className="back-button"
                        onClick={() => navigate('/')}
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="order-preparing">
            <div className="preparing-container">
                {!isCompleted ? (
                    <>
                        <img src={assets.cooking_icon} alt="Cooking" className="cooking-icon" />
                        <h2>Preparing Your Order</h2>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <p className="status-text">
                            {progress < 30 ? "Order received" :
                                progress < 60 ? "Preparing your delicious food" :
                                    progress < 90 ? "Almost ready" :
                                        "Order completed!"}
                        </p>
                        <p className="estimated-time">Estimated time: {Math.max(0, 10 - Math.floor(progress / 10))} minutes</p>
                    </>
                ) : (
                    <div className="order-completed">
                        <img src={assets.delivery_icon} alt="Delivery" className="delivery-icon" />
                        <h2>Order Delivered!</h2>
                        <p className="enjoy-message">Enjoy your delicious meal!</p>
                    </div>
                )}

                <div className="order-details">
                    <h3>Order Details</h3>
                    <div className="order-items">
                        {Object.entries(orderDetails.items).map(([itemId, quantity]) => {
                            const item = getItemDetails(itemId);
                            if (!item) return null;
                            return (
                                <div key={itemId} className="order-item">
                                    <img src={item.image} alt={item.name} />
                                    <div className="item-info">
                                        <h4>{item.name}</h4>
                                        <p>Quantity: {quantity}</p>
                                        <p>Price: ${item.price * quantity}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="order-summary">
                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>${orderDetails.totalAmount}</span>
                        </div>
                        <div className="summary-row">
                            <span>Delivery Fee:</span>
                            <span>$2.00</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total:</span>
                            <span>${orderDetails.totalAmount + 2}</span>
                        </div>
                    </div>
                    <div className="delivery-address">
                        <h4>Delivery Address:</h4>
                        <p>{orderDetails.shippingAddress.street}</p>
                        <p>{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}</p>
                        <p>{orderDetails.shippingAddress.zipCode}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPreparing; 