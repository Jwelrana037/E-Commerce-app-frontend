import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import ProductCard from '../components/ProductCard';
import products from '../data/products';

import './ProductDetails.css';

function ProductDetails() {
  // URL থেকে Product ID সংগ্রহ করছি
  const { id } = useParams();

  // ID অনুযায়ী নির্দিষ্ট Product খুঁজছি
  const product = products.find((item) => item.id === id);

  // Quantity সংরক্ষণ করার State
  const [quantity, setQuantity] = useState(1);

  // Add to Cart বাটনে ক্লিকের মেসেজ
  const [message, setMessage] = useState('');

  // Product না পাওয়া গেলে
  if (!product) {
    return (
      <main className="product-not-found">
        <div className="not-found-icon">🔎</div>

        <h1>Product Not Found</h1>

        <p>Sorry, we could not find the product you are looking for.</p>

        <Link to="/products" className="back-to-products">
          ← Back to Products
        </Link>
      </main>
    );
  }

  // Related Products খুঁজছি
  const relatedProducts = products
    .filter(
      (item) => item.category === product.category && item.id !== product.id
    )
    .slice(0, 4);

  // Quantity বাড়ানোর Function
  function increaseQuantity() {
    setQuantity((previousQuantity) => previousQuantity + 1);
  }

  // Quantity কমানোর Function
  function decreaseQuantity() {
    setQuantity((previousQuantity) => Math.max(1, previousQuantity - 1));
  }

  // Add to Cart Button Handler
  function handleAddToCart() {
    setMessage(`${quantity} × ${product.name} selected successfully!`);
  }

  // Discount হিসাব করছি
  const discountPercentage =
    product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
      : 0;

  return (
    <main className="product-details-page">
      {/* Breadcrumb Navigation */}
      <nav className="product-breadcrumb">
        <Link to="/">Home</Link>

        <span>/</span>

        <Link to="/products">Products</Link>

        <span>/</span>

        <span className="breadcrumb-current">{product.name}</span>
      </nav>

      {/* Product Information */}
      <section className="product-details-container">
        {/* Product Image */}
        <div className="product-details-image-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="product-details-image"
          />

          {product.badge && (
            <span className="details-product-badge">{product.badge}</span>
          )}

          {discountPercentage > 0 && (
            <span className="details-discount-badge">
              -{discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Product Information */}
        <div className="product-details-info">
          <span className="details-category">{product.category}</span>

          <h1>{product.name}</h1>

          <div className="details-rating">
            <span className="rating-stars">★★★★★</span>

            <strong>{product.rating}</strong>

            <span className="rating-text">Customer Rating</span>
          </div>

          {/* Price */}
          <div className="details-price-wrapper">
            <strong className="details-current-price">
              ৳{product.price.toLocaleString('en-BD')}
            </strong>

            {product.oldPrice > product.price && (
              <del className="details-old-price">
                ৳{product.oldPrice.toLocaleString('en-BD')}
              </del>
            )}
          </div>

          {discountPercentage > 0 && (
            <p className="details-saving">
              You save ৳
              {(product.oldPrice - product.price).toLocaleString('en-BD')} (
              {discountPercentage}% OFF)
            </p>
          )}

          {/* Description */}
          <div className="details-description">
            <h2>Product Description</h2>

            <p>{product.description}</p>
          </div>

          {/* Stock Status */}
          <div className="details-stock">
            <span className="stock-dot"></span>

            <span>In Stock</span>
          </div>

          {/* Quantity Selector */}
          <div className="quantity-section">
            <label>Quantity:</label>

            <div className="quantity-controls">
              <button
                type="button"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={increaseQuantity}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Total Price */}
          <div className="details-total">
            <span>Total Price:</span>

            <strong>
              ৳{(product.price * quantity).toLocaleString('en-BD')}
            </strong>
          </div>

          {/* Add to Cart */}
          <button
            type="button"
            className="details-add-to-cart"
            onClick={handleAddToCart}
          >
            🛒 Add to Cart
          </button>

          {/* Feedback Message */}
          {message && (
            <p className="cart-feedback" role="status">
              ✅ {message}
            </p>
          )}

          {/* Shopping Benefits */}
          <div className="details-benefits">
            <div>
              <span>🚚</span>
              <p>Fast Delivery</p>
            </div>

            <div>
              <span>🔒</span>
              <p>Secure Shopping</p>
            </div>

            <div>
              <span>↩️</span>
              <p>Easy Returns</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products-section">
          <div className="related-section-heading">
            <span>YOU MAY ALSO LIKE</span>

            <h2>Related Products</h2>

            <p>Discover more products from the same category.</p>
          </div>

          <div className="related-products-grid">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default ProductDetails;
