import React, { useContext } from 'react';
import './CartPreview.css';
import { StoreContext } from '../../context/StoreContext';
import { Link } from 'react-router-dom';

const CartPreview = ({ isVisible }) => {
    const { cartItems, food_list, getTotalCartAmount } = useContext(StoreContext);

    if (!isVisible) return null;

    const cartItemsList = Object.entries(cartItems)
        .filter(([_, quantity]) => quantity > 0)
        .map(([itemId, quantity]) => {
            const item = food_list.find(product => product._id === itemId);
            if (!item) return null;
            return {
                ...item,
                quantity
            };
        })
        .filter(Boolean);

    if (cartItemsList.length === 0) {
        return (
            <div className="cart-preview">
                <div className="empty-cart">Your cart is empty</div>
            </div>
        );
    }

    return (
        <div className="cart-preview">
            <div className="cart-items">
                {cartItemsList.map((item) => (
                    <div key={item._id} className="cart-item">
                        <img src={item.image} alt={item.name} />
                        <div className="item-details">
                            <h4>{item.name}</h4>
                            <p>Quantity: {item.quantity}</p>
                            <p>${item.price * item.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-summary">
                <div className="total">
                    <span>Total:</span>
                    <span>${getTotalCartAmount()}</span>
                </div>
                <Link to="/cart" className="view-cart-button">
                    View Cart
                </Link>
            </div>
        </div>
    );
};

export default CartPreview; 