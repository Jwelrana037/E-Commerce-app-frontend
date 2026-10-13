import { Link } from 'react-router-dom';

import './ProductCard.css';

function ProductCard({ product }) {
  const discountPercentage = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  return (
    <article className="product-card">
      {/* Product Image */}

      <div className="product-card-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
          loading="lazy"
        />

        {/* Product Badge */}

        {product.badge && (
          <span className="product-card-badge">{product.badge}</span>
        )}

        {/* Discount Badge */}

        {product.oldPrice > product.price && (
          <span className="product-card-discount">-{discountPercentage}%</span>
        )}

        {/* Wishlist Button */}

        <button
          type="button"
          className="product-card-wishlist"
          aria-label={`Add ${product.name} to wishlist`}
        >
          ♡
        </button>
      </div>

      {/* Product Information */}

      <div className="product-card-info">
        <span className="product-card-category">{product.category}</span>

        <h3 className="product-card-title">{product.name}</h3>

        <p className="product-card-description">{product.description}</p>

        {/* Product Rating */}

        <div className="product-card-rating">
          <span>★</span>
          <span>{product.rating}</span>
          <span className="rating-label">Customer Rating</span>
        </div>

        {/* Product Price */}

        <div className="product-card-prices">
          <strong className="product-card-price">
            ৳{product.price.toLocaleString('en-BD')}
          </strong>

          {product.oldPrice > product.price && (
            <del className="product-card-old-price">
              ৳{product.oldPrice.toLocaleString('en-BD')}
            </del>
          )}
        </div>

        {/* Product Details Button */}

        <Link to={`/products/${product.id}`} className="product-card-button">
          View Product →
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
