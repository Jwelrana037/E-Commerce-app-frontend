import { Link, NavLink } from 'react-router-dom';

import './Navbar.css';

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Website Logo */}
        <Link to="/" className="navbar-logo">
          Shop<span>Zone</span>
        </Link>

        {/* Navigation Links */}
        <nav className="navbar-menu">
          <NavLink to="/" end>
            Home
          </NavLink>

          <NavLink to="/products">Products</NavLink>

          <NavLink to="/categories">Categories</NavLink>
        </nav>

        {/* Navbar Actions */}
        <div className="navbar-actions">
          {/* Search */}
          <Link to="/products" className="navbar-search">
            Search
          </Link>

          {/* Cart */}
          <Link to="/cart" className="navbar-cart">
            Cart
            <span className="cart-count">0</span>
          </Link>

          {/* Login */}
          <Link to="/login" className="navbar-login">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
