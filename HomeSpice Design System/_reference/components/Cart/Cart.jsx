import React, { useState, useEffect } from 'react';
import './Cart.css';

const Cart = ({ isOpen, onClose }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (isOpen) {
            fetchCart();
        }
    }, [isOpen]);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Please login to view your cart');
                setLoading(false);
                return;
            }

            const response = await fetch('http://localhost:5000/api/cart', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch cart');
            }

            const data = await response.json();
            setCartItems(data.items);
            setTotal(data.total);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (productId, newQuantity) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/cart/update/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ quantity: newQuantity })
            });

            if (!response.ok) {
                throw new Error('Failed to update quantity');
            }

            const data = await response.json();
            setCartItems(data.items);
            setTotal(data.total);
        } catch (err) {
            setError(err.message);
        }
    };

    const removeItem = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/cart/remove/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to remove item');
            }

            const data = await response.json();
            setCartItems(data.items);
            setTotal(data.total);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCheckout = () => {
        // Implement checkout logic here
        console.log('Proceeding to checkout...');
    };

    if (!isOpen) return null;

    return (
        <div className="cart-overlay">
            <div className="cart-container">
                <div className="cart-header">
                    <h2>Your Cart</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>

                {loading ? (
                    <div className="loading">Loading cart...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : cartItems.length === 0 ? (
                    <div className="empty-cart">Your cart is empty</div>
                ) : (
                    <>
                        <div className="cart-items">
                            {cartItems.map((item) => (
                                <div key={item.product._id} className="cart-item">
                                    <img src={item.product.image} alt={item.product.name} />
                                    <div className="item-details">
                                        <h3>{item.product.name}</h3>
                                        <p>${item.product.price.toFixed(2)}</p>
                                        <div className="quantity-controls">
                                            <button
                                                onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        className="remove-button"
                                        onClick={() => removeItem(item.product._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <div className="total">
                                <span>Total:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <button
                                className="checkout-button"
                                onClick={handleCheckout}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart; 