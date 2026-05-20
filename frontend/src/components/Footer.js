// Footer.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../components/footer.css';

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand / About */}
        <div className="footer-brand">
          <h2 className="footer-logo">Momentum Sports</h2>
          <p className="footer-text">
            Performance gear for athletes who push limits.
            Train harder. Go further. Break boundaries.
          </p>
        </div>

        {/* Navigation */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <nav className="footer-nav">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/support">Support</Link>
            <Link to="/about">About</Link>
            <Link to="/cart">Cart</Link>
          </nav>
        </div>

        {/* Contact */}
        <div className="footer-column">
          <h3>Contact</h3>

          <div className="footer-info">
            <p><span>Email:</span> vibe@gmail.com</p>
            <p><span>Phone:</span> 060 938 1536</p>
            <p><span>Location:</span> South Africa</p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Momentum Sports. All rights reserved.</p>

      </div>

    </footer>
  );
};

export default Footer;