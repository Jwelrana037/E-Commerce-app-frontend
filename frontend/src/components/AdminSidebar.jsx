import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import './AdminSidebar.css';

function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="admin-menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle admin menu"
        aria-expanded={isOpen}
      >
        ☰
      </button>

      {isOpen && (
        <button
          type="button"
          className="admin-sidebar-overlay"
          onClick={closeSidebar}
          aria-label="Close admin menu"
        />
      )}

      <aside className={`admin-sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <Link to="/admin" className="admin-sidebar-logo" onClick={closeSidebar}>
          <span className="admin-logo-icon">S</span>

          <span>
            Shop<span>Zone</span>
            <small>ADMIN PANEL</small>
          </span>
        </Link>

        <p className="admin-menu-label">MAIN MENU</p>

        <nav className="admin-sidebar-nav">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive ? 'admin-nav-link active' : 'admin-nav-link'
            }
            onClick={closeSidebar}
          >
            <span>📊</span>
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            end
            className={({ isActive }) =>
              isActive ? 'admin-nav-link active' : 'admin-nav-link'
            }
            onClick={closeSidebar}
          >
            <span>📦</span>
            All Products
          </NavLink>

          <NavLink
            to="/admin/products/new"
            className={({ isActive }) =>
              isActive ? 'admin-nav-link active' : 'admin-nav-link'
            }
            onClick={closeSidebar}
          >
            <span>➕</span>
            Add Product
          </NavLink>
        </nav>

        <div className="admin-sidebar-bottom">
          <Link to="/" className="admin-store-link" onClick={closeSidebar}>
            <span>🏪</span>
            Visit Store
          </Link>

          <div className="admin-profile">
            <div className="admin-avatar">A</div>

            <div>
              <strong>Store Admin</strong>
              <small>Administrator</small>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
