import React, { useState } from "react";
import "./Checkout.css";

const Checkout = ({ isOpen, onClose, cartItems, total }) => {
    const [formData, setFormData] = useState({
        street: "",
        city: "",
        state: "",
        zipCode: "",
        cardNumber: "",
        expiryDate: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Please log in to place an order");
            }

            // Create order
            const response = await fetch("http://localhost:5000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    shippingAddress: {
                        street: formData.street,
                        city: formData.city,
                        state: formData.state,
                        zipCode: formData.zipCode,
                    },
                    paymentDetails: {
                        cardNumber: formData.cardNumber,
                        expiryDate: formData.expiryDate,
                    },
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Failed to place order");
            }

            // Simulate payment processing
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Clear cart and close checkout
            onClose();
            window.location.href = "/orders"; // Redirect to orders page
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="checkout-overlay">
            <div className="checkout-container">
                <div className="checkout-header">
                    <h2>Checkout</h2>
                    <button className="close-button" onClick={onClose}>
                        ×
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form className="checkout-form" onSubmit={handleSubmit}>
                    <div className="form-section">
                        <h3>Shipping Address</h3>
                        <div className="address-row">
                            <input
                                type="text"
                                name="street"
                                placeholder="Street Address"
                                value={formData.street}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={formData.state}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="zipCode"
                                placeholder="ZIP Code"
                                value={formData.zipCode}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Payment Details</h3>
                        <div className="card-row">
                            <input
                                type="text"
                                name="cardNumber"
                                placeholder="Card Number"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="expiryDate"
                                placeholder="MM/YY"
                                value={formData.expiryDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="order-summary">
                        <h3>Order Summary</h3>
                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping:</span>
                            <span>Free</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="place-order-button"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Place Order"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Checkout; 