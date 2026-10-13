import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import  products  from "../data/products";
import "./AdminProductForm.css";

function AdminProductForm() {
const { id } = useParams();
const navigate = useNavigate();

const isEditMode = Boolean(id);

const existingProduct = products.find(
(product) => String(product.id) === id
);

const [formData, setFormData] = useState(() => ({
name: existingProduct?.name || "",
category: existingProduct?.category || "Electronics",
price: existingProduct?.price ?? "",
oldPrice: existingProduct?.oldPrice ?? "",
rating: existingProduct?.rating ?? 4.5,
image: existingProduct?.image || "",
badge: existingProduct?.badge || "NEW",
description: existingProduct?.description || "",
}));

const [error, setError] = useState("");

const handleChange = (event) => {
const { name, value } = event.target;


setFormData((previousData) => ({
  ...previousData,
  [name]: value,
}));


};

const handleSubmit = (event) => {
event.preventDefault();


if (
  !formData.name.trim() ||
  !formData.category ||
  formData.price === "" ||
  !formData.image.trim() ||
  !formData.description.trim()
) {
  setError("Please fill in all required fields.");
  return;
}

if (!Number.isFinite(Number(formData.price)) || Number(formData.price) <= 0) {
  setError("Please enter a valid product price.");
  return;
}

const productData = {
  ...formData,
  price: Number(formData.price),
  oldPrice:
    formData.oldPrice === "" ? null : Number(formData.oldPrice),
  rating: Number(formData.rating),
};

console.log(
  isEditMode ? "Updated product:" : "New product:",
  productData
);

window.alert(
  isEditMode
    ? "Demo: Product update data is ready. Backend is not connected yet."
    : "Demo: Product data is ready. Backend is not connected yet."
);

navigate("/admin/products");


};

if (isEditMode && !existingProduct) {
return ( <main className="admin-product-form-page"> <div className="admin-form-card"> <h1>Product Not Found</h1> <p>The requested product does not exist in the demo data.</p>


      <Link to="/admin/products" className="admin-form-back-link">
        ← Back to Products
      </Link>
    </div>
  </main>
);


}

return ( <main className="admin-product-form-page"> <div className="admin-form-heading"> <p className="admin-eyebrow">SHOPZONE ADMIN</p>


    <h1>{isEditMode ? "Edit Product" : "Add New Product"}</h1>

    <p>
      {isEditMode
        ? "Update the product information."
        : "Enter the information for your new product."}
    </p>
  </div>

  <form className="admin-form-card" onSubmit={handleSubmit}>
    {error && <div className="admin-form-error">{error}</div>}

    <div className="admin-form-group">
      <label htmlFor="name">Product Name *</label>

      <input
        id="name"
        name="name"
        type="text"
        placeholder="Example: Wireless Headphones"
        value={formData.name}
        onChange={handleChange}
      />
    </div>

    <div className="admin-form-row">
      <div className="admin-form-group">
        <label htmlFor="category">Category *</label>

        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Electronics">Electronics</option>
          <option value="Watches">Watches</option>
          <option value="Shoes">Shoes</option>
          <option value="Accessories">Accessories</option>
          <option value="Clothing">Clothing</option>
        </select>
      </div>

      <div className="admin-form-group">
        <label htmlFor="badge">Product Badge</label>

        <select
          id="badge"
          name="badge"
          value={formData.badge}
          onChange={handleChange}
        >
          <option value="NEW">NEW</option>
          <option value="SALE">SALE</option>
          <option value="POPULAR">POPULAR</option>
          <option value="">No Badge</option>
        </select>
      </div>
    </div>

    <div className="admin-form-row">
      <div className="admin-form-group">
        <label htmlFor="price">Price (৳) *</label>

        <input
          id="price"
          name="price"
          type="number"
          min="1"
          placeholder="2500"
          value={formData.price}
          onChange={handleChange}
        />
      </div>

      <div className="admin-form-group">
        <label htmlFor="oldPrice">Old Price (৳)</label>

        <input
          id="oldPrice"
          name="oldPrice"
          type="number"
          min="0"
          placeholder="3200"
          value={formData.oldPrice}
          onChange={handleChange}
        />
      </div>
    </div>

    <div className="admin-form-row">
      <div className="admin-form-group">
        <label htmlFor="rating">Rating</label>

        <input
          id="rating"
          name="rating"
          type="number"
          min="0"
          max="5"
          step="0.1"
          value={formData.rating}
          onChange={handleChange}
        />
      </div>

      <div className="admin-form-group">
        <label htmlFor="image">Image URL *</label>

        <input
          id="image"
          name="image"
          type="url"
          placeholder="https://example.com/product.jpg"
          value={formData.image}
          onChange={handleChange}
        />
      </div>
    </div>

    <div className="admin-form-group">
      <label htmlFor="description">Description *</label>

      <textarea
        id="description"
        name="description"
        rows="5"
        placeholder="Write a description of your product..."
        value={formData.description}
        onChange={handleChange}
      />
    </div>

    <div className="admin-form-actions">
      <Link to="/admin/products" className="admin-form-cancel">
        Cancel
      </Link>

      <button type="submit" className="admin-form-submit">
        {isEditMode ? "Update Product" : "Save Product"}
      </button>
    </div>

    <p className="admin-form-note">
      Demo mode: this form does not save products permanently. Backend
      integration will be added later.
    </p>
  </form>
</main>


);
}

export default AdminProductForm;
