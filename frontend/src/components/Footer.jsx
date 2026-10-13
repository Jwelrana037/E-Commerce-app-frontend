import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="shop-footer">
      <div className="shop-footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            Shop<span>Zone</span>
          </Link>

          <p>
            Discover quality products, great prices, and a better shopping
            experience with ShopZone.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/cart">Shopping Cart</Link>
        </div>

        <div className="footer-links">
          <h3>Account</h3>

          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/forgot-password">Forgot Password</Link>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>

          <p>Email: support@shopzone.example</p>
          <p>Customer Support</p>
          <p>Bangladesh</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ShopZone. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
