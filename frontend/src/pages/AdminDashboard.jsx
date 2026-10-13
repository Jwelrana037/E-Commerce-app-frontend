import { Link } from "react-router-dom";
import  products  from "../data/products";
import "./AdminDashboard.css";

function AdminDashboard() {
const totalProducts = products.length;

const totalOrders = 125;

const totalUsers = 350;

const recentOrders = [
{
id: "ORD-1001",
customer: "Rahim Ahmed",
date: "12 Oct 2026",
amount: 4500,
status: "Delivered",
},
{
id: "ORD-1002",
customer: "Karim Hasan",
date: "12 Oct 2026",
amount: 2800,
status: "Pending",
},
{
id: "ORD-1003",
customer: "Nusrat Jahan",
date: "11 Oct 2026",
amount: 6200,
status: "Processing",
},
{
id: "ORD-1004",
customer: "Sakib Hossain",
date: "10 Oct 2026",
amount: 1800,
status: "Delivered",
},
];

return ( <main className="admin-dashboard"> <div className="admin-header"> <div> <p className="admin-eyebrow">SHOPZONE ADMIN</p> <h1>Dashboard Overview</h1> <p>Welcome back! Here is your store overview.</p> </div>

    <Link to="/admin/products/new" className="admin-primary-button">
      + Add Product
    </Link>
  </div>

  <section className="admin-stats">
    <div className="admin-stat-card">
      <div className="stat-icon products-icon">📦</div>
      <p>Total Products</p>
      <h2>{totalProducts}</h2>
      <span>Products in your catalog</span>
    </div>

    <div className="admin-stat-card">
      <div className="stat-icon orders-icon">🛒</div>
      <p>Total Orders</p>
      <h2>{totalOrders}</h2>
      <span>Demo order statistics</span>
    </div>

    <div className="admin-stat-card">
      <div className="stat-icon users-icon">👥</div>
      <p>Total Users</p>
      <h2>{totalUsers}</h2>
      <span>Demo registered users</span>
    </div>

    <div className="admin-stat-card">
      <div className="stat-icon revenue-icon">৳</div>
      <p>Total Revenue</p>
      <h2>৳85,500</h2>
      <span>Demo revenue statistics</span>
    </div>
  </section>

  <section className="admin-panel">
    <div className="admin-panel-header">
      <div>
        <h2>Recent Orders</h2>
        <p>Latest customer orders</p>
      </div>

      <button
        className="admin-secondary-button"
        onClick={() => window.alert("Orders page will be added later.")}
      >
        View All
      </button>
    </div>

    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {recentOrders.map((order) => (
            <tr key={order.id}>
              <td className="order-id">{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.date}</td>
              <td>৳{order.amount.toLocaleString("en-BD")}</td>
              <td>
                <span
                  className={`order-status ${order.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>

  <section className="admin-quick-actions">
    <h2>Quick Actions</h2>

    <div className="quick-action-grid">
      <Link to="/admin/products" className="quick-action-card">
        <span>📦</span>
        <h3>Manage Products</h3>
        <p>View, edit and delete products.</p>
      </Link>

      <Link to="/admin/products/new" className="quick-action-card">
        <span>➕</span>
        <h3>Add New Product</h3>
        <p>Add a new item to your store.</p>
      </Link>
    </div>
  </section>
</main>


);
}

export default AdminDashboard;
