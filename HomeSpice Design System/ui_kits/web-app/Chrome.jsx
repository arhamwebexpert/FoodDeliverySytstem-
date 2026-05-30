// HomeSpice UI kit — chrome: Navbar, Footer, Toasts
const { useState } = React;
const CA = window.HS_ASSETS;

function Navbar({ active, onNav, cartCount, user, onCart, onSignIn, onLogout }) {
  const items = [['home','Home'], ['menu','Menu']];
  if (user) items.push(['orders','Order Status']);
  return (
    <div className="nav">
      <img className="nav-logo" src={CA.logo} alt="HomeSpice" onClick={() => onNav('home')} style={{cursor:'pointer'}} />
      <ul className="nav-menu">
        {items.map(([k,label]) => (
          <li key={k} className={active===k ? 'active' : ''} onClick={() => onNav(k)}>{label}</li>
        ))}
      </ul>
      <div className="nav-right">
        <img className="nav-icon" src={CA.search} alt="search" />
        {user
          ? <div className="nav-user"><span>Welcome, {user}</span><button className="btn-ghost" onClick={onLogout}>Logout</button></div>
          : <button className="btn-coral" onClick={onSignIn}>Sign In</button>}
        <div className="nav-cart" onClick={onCart}>
          <img src={CA.basket} alt="cart" />
          {cartCount > 0 && <span className="nav-dot">{cartCount}</span>}
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <div className="footer-grid">
        <div className="footer-col">
          <img className="flogo" src={CA.logo} alt="HomeSpice" />
          <p>Your neighbourhood kitchen, plated beautifully and brought to your door. Fresh meals from a menu crafted with the finest ingredients — delivered hot, fast, and with care.</p>
          <div className="footer-social">
            <img src={CA.facebook} alt="Facebook" />
            <img src={CA.twitter} alt="Twitter" />
            <img src={CA.linkedin} alt="LinkedIn" />
          </div>
        </div>
        <div className="footer-col">
          <h4>COMPANY</h4>
          <ul><li>Home</li><li>About Us</li><li>Delivery</li><li>Privacy Policy</li></ul>
        </div>
        <div className="footer-col">
          <h4>GET IN TOUCH</h4>
          <ul><li>+1-212-456-7890</li><li>contact@HomeSpice.com</li></ul>
        </div>
      </div>
      <hr className="footer-hr" />
      <p className="footer-copy">Copyright 2026 © HomeSpice.com — All Rights Reserved.</p>
    </div>
  );
}

function Toasts({ toasts, dismiss }) {
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          <span className="ti">{t.type==='success' ? '✓' : '!'}</span>
          <span className="tm">{t.msg}</span>
          <button className="tx" onClick={() => dismiss(t.id)}>×</button>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { Navbar, Footer, Toasts });
