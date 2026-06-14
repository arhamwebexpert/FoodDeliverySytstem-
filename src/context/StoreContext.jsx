import React, { createContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});
    const [food_list, setFoodList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    // Fetch food items
    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/products`);
                if (!response.ok) {
                    throw new Error('Failed to fetch food items');
                }
                const data = await response.json();
                setFoodList(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFoodItems();
    }, []);

    // Fetch cart items
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const response = await fetch(`${API_BASE_URL}/api/cart`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        // Token expired or invalid
                        localStorage.removeItem('token');
                        return;
                    }
                    throw new Error('Failed to fetch cart');
                }

                const data = await response.json();
                // Convert cart items array to object format
                const cartItemsObj = data.items.reduce((acc, item) => {
                    acc[item.product._id] = item.quantity;
                    return acc;
                }, {});
                setCartItems(cartItemsObj);
            } catch (err) {
                console.error('Error fetching cart:', err);
            }
        };

        fetchCart();
    }, []);

    const addToCart = async (itemId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Please log in to add items to cart');
            }

            const response = await fetch(`${API_BASE_URL}/api/cart/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId: itemId,
                    quantity: 1,
                }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    throw new Error('Please log in again');
                }
                throw new Error('Failed to add item to cart');
            }

            const data = await response.json();
            const cartItemsObj = data.items.reduce((acc, item) => {
                acc[item.product._id] = item.quantity;
                return acc;
            }, {});
            setCartItems(cartItemsObj);
            const itemName = food_list.find(p => p._id === itemId)?.name;
            showToast(itemName ? `${itemName} added to cart!` : 'Item added to cart!', 'success');
        } catch (err) {
            console.error('Error adding to cart:', err);
            showToast(err.message, 'error');
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Please log in to remove items from cart');
            }

            const response = await fetch(`${API_BASE_URL}/api/cart/remove/${itemId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    throw new Error('Please log in again');
                }
                throw new Error('Failed to remove item from cart');
            }

            const data = await response.json();
            const cartItemsObj = data.items.reduce((acc, item) => {
                acc[item.product._id] = item.quantity;
                return acc;
            }, {});
            setCartItems(cartItemsObj);
        } catch (err) {
            console.error('Error removing from cart:', err);
            showToast(err.message, 'error');
        }
    };

    const clearCart = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Please log in to clear cart');
            }

            const response = await fetch(`${API_BASE_URL}/api/cart/clear`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    throw new Error('Please log in again');
                }
                throw new Error('Failed to clear cart');
            }

            setCartItems({});
        } catch (err) {
            console.error('Error clearing cart:', err);
            showToast(err.message, 'error');
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find(product => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalCartAmount,
        loading,
        error,
        toasts,
        removeToast,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;