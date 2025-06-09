import React, { useContext, useState, useEffect } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import CartPreview from '../CartPreview/CartPreview';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const [user, setUser] = useState(null);
    const { getTotalCartAmount } = useContext(StoreContext);
    const [showCartPreview, setShowCartPreview] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setUser(null);
                return;
            }

            const response = await fetch('http://localhost:5000/api/users/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                // If token is invalid or expired, clear it
                localStorage.removeItem('token');
                setUser(null);
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
            localStorage.removeItem('token');
            setUser(null);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    useEffect(() => {
        // Update menu based on current path
        const path = location.pathname;
        if (path === '/') setMenu('home');
        else if (path === '/menu') setMenu('menu');
        else if (path === '/preparing') setMenu('order-status');
    }, [location]);

    const handleMenuClick = () => {
        setMenu("menu");
        if (location.pathname !== '/') {
            navigate('/');
        }
        // Wait for navigation to complete before scrolling
        setTimeout(() => {
            const menuSection = document.getElementById('explore-menu');
            if (menuSection) {
                menuSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    const handleSignInClick = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setShowLogin(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt="" /></Link>
            <ul className="navbar-menu">
                <Link to="/" className={menu === "home" ? "active" : ""}>
                    <li onClick={() => setMenu("home")}>Home</li>
                </Link>
                <li
                    onClick={handleMenuClick}
                    className={menu === "menu" ? "active" : ""}
                >
                    Menu
                </li>
                {user && (
                    <Link to="/preparing" className={menu === "order-status" ? "active" : ""}>
                        <li onClick={() => setMenu("order-status")}>Order Status</li>
                    </Link>
                )}
            </ul>
            <div className="navbar-right">
                <div className="search-icon">
                    <img src={assets.search_icon} alt="" />
                </div>
                {user ? (
                    <div className="user-profile">
                        <span className="username">Welcome, {user.name}</span>
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <button className="signin-button" onClick={handleSignInClick}>Sign In</button>
                )}
                <div
                    className="cart-icon-container"
                    onMouseEnter={() => setShowCartPreview(true)}
                    onMouseLeave={() => setShowCartPreview(false)}
                >
                    <Link to='/cart'>
                        <img src={assets.basket_icon} alt="" />
                    </Link>
                    <CartPreview isVisible={showCartPreview} />
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
