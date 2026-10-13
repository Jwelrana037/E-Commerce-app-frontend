import { Link } from 'react-router-dom';

import { useCart } from '../context/CartContext';

import './Cart.css';

function Cart() {
  const {
    cartItems,
    cartCount,
    subtotal,
    shipping,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  // Cart খালি থাকলে
  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <section className="empty-cart">
          <div className="empty-cart-icon">🛒</div>

          <h1>Your Cart Is Empty</h1>

          <p>
            You haven't added any products to your cart yet. Discover our
            collection and find something you love.
          </p>

          <Link to="/products" className="continue-shopping-button">
            Continue Shopping →
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="cart-page">
      {/* Page Heading */}
      <section className="cart-page-header">
        <div>
          <span className="cart-eyebrow">YOUR SHOPPING BAG</span>

          <h1>Shopping Cart</h1>

          <p>Review your products before checkout.</p>
        </div>

        <Link to="/products" className="back-shopping-link">
          ← Continue Shopping
        </Link>
      </section>

      {/* Cart Layout */}
      <section className="cart-layout">
        {/* Cart Items */}
        <div className="cart-items-section">
          <div className="cart-items-header">
            <h2>Your Products</h2>

            <span>
              {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </span>
          </div>

          <div className="cart-items-list">
            {cartItems.map((item) => (
              <article className="cart-item" key={item.id}>
                {/* Product Image */}
                <Link
                  to={`/products/${item.id}`}
                  className="cart-item-image-link"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                </Link>

                {/* Product Information */}
                <div className="cart-item-info">
                  <span className="cart-item-category">{item.category}</span>

                  <Link to={`/products/${item.id}`} className="cart-item-name">
                    {item.name}
                  </Link>

                  <p className="cart-item-price">
                    ৳{item.price.toLocaleString('en-BD')}
                  </p>

                  {/* Quantity Controls */}
                  <div className="cart-quantity-controls">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price and Remove Button */}
                <div className="cart-item-actions">
                  <strong className="cart-item-total">
                    ৳{(item.price * item.quantity).toLocaleString('en-BD')}
                  </strong>

                  <button
                    type="button"
                    className="remove-cart-item"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="clear-cart-button"
            onClick={clearCart}
          >
            Clear Entire Cart
          </button>
        </div>

        {/* Order Summary */}
        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Products ({cartCount} items)</span>

            <strong>৳{subtotal.toLocaleString('en-BD')}</strong>
          </div>

          <div className="summary-row">
            <span>Delivery Charge</span>

            <strong>
              {shipping === 0 ? 'Free' : `৳${shipping.toLocaleString('en-BD')}`}
            </strong>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total-row">
            <span>Total</span>

            <strong>৳{totalPrice.toLocaleString('en-BD')}</strong>
          </div>

          <button
            type="button"
            className="checkout-button"
            onClick={() =>
              alert('Checkout will be implemented in a later step.')
            }
          >
            Proceed to Checkout →
          </button>

          <div className="summary-security">
            <span>🔒</span>

            <p>Safe and secure shopping experience.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default Cart;
