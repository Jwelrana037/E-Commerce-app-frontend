import { Link } from "react-router-dom";
import { useState } from "react";
import  initialProducts  from "../data/products";
import "./AdminProducts.css";

function AdminProducts() {
const [productList, setProductList] = useState(initialProducts);
const [searchTerm, setSearchTerm] = useState("");

const filteredProducts = productList.filter((product) =>
product.name.toLowerCase().includes(searchTerm.toLowerCase())
);

const handleDelete = (productId) => {
const confirmed = window.confirm(
"Are you sure you want to delete this product?"
);


if (!confirmed) {
  return;
}

setProductList((previousProducts) =>
  previousProducts.filter((product) => product.id !== productId)
);


};

return ( <main className="admin-products-page"> <div className="admin-products-header"> <div> <p className="admin-eyebrow">SHOPZONE ADMIN</p> <h1>Manage Products</h1> <p>View and manage your store products.</p> </div>


    <Link to="/admin/products/new" className="admin-primary-button">
      + Add Product
    </Link>
  </div>

  <section className="products-management-panel">
    <div className="products-management-toolbar">
      <div>
        <h2>All Products</h2>
        <p>{filteredProducts.length} products found</p>
      </div>

      <input
        type="search"
        className="admin-product-search"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
    </div>

    <div className="admin-products-table-wrapper">
      <table className="admin-products-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>
                <div className="admin-product-info">
                  <img src={product.image} alt={product.name} />

                  <div>
                    <strong>{product.name}</strong>
                    <span>ID: {product.id}</span>
                  </div>
                </div>
              </td>

              <td>{product.category}</td>

              <td>৳{product.price.toLocaleString("en-BD")}</td>

              <td>⭐ {product.rating}</td>

              <td>
                <div className="admin-product-actions">
                  <Link
                    to={`/admin/products/${product.id}/edit`}
                    className="edit-product-button"
                  >
                    Edit
                  </Link>

                  <button
                    type="button"
                    className="delete-product-button"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredProducts.length === 0 && (
        <div className="admin-products-empty">
          <h3>No products found</h3>
          <p>Try another search term.</p>
        </div>
      )}
    </div>
  </section>
</main>


);
}

export default AdminProducts;
