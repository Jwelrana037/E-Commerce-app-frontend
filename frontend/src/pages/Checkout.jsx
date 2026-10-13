import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useCart } from '../context/CartContext';

import './Checkout.css';

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, cartCount, subtotal, totalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    address: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');

  const [errors, setErrors] = useState({});

  const [successMessage, setSuccessMessage] = useState('');

  // Input-এর Value পরিবর্তন
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: '',
    }));
  }

  // Form Validation
  function validateForm() {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must contain at least 3 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Enter a valid phone number.';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City or district is required.';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Delivery address is required.';
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Please provide a more detailed address.';
    }

    return newErrors;
  }

  // Place Order
  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (cartItems.length === 0) {
      setSuccessMessage('Your cart is empty. Please add products first.');
      return;
    }

    // আপাতত Demo Order Object তৈরি করছি
    const orderData = {
      customer: {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        city: formData.city.trim(),
        address: formData.address.trim(),
      },

      items: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),

      paymentMethod,

      subtotal,

      shipping: 0,

      totalPrice,

      createdAt: new Date().toISOString(),
    };

    console.log('Demo Order:', orderData);

    // Backend এখনো যুক্ত হয়নি
    setSuccessMessage(
      'Your information is valid! Real order placement will be enabled after backend integration.'
    );
  }

  // Cart খালি হলে
  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <section className="checkout-empty">
          <div className="checkout-empty-icon">🛒</div>

          <h1>Your Cart Is Empty</h1>

          <p>Add some products to your cart before checkout.</p>

          <Link to="/products" className="checkout-primary-button">
            Continue Shopping →
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      {/* Page Header */}
      <section className="checkout-header">
        <span className="checkout-eyebrow">ALMOST THERE</span>

        <h1>Checkout</h1>

        <p>Complete your delivery information and review your order.</p>
      </section>

      {/* Checkout Layout */}
      <form className="checkout-layout" onSubmit={handleSubmit} noValidate>
        {/* Customer Form */}
        <div className="checkout-form-column">
          <section className="checkout-card">
            <div className="checkout-section-heading">
              <span className="checkout-step-number">1</span>

              <div>
                <h2>Contact Information</h2>

                <p>Tell us how we can contact you.</p>
              </div>
            </div>

            <div className="checkout-fields-grid">
              {/* Full Name */}
              <div className="checkout-field">
                <label htmlFor="checkoutFullName">Full Name</label>

                <input
                  id="checkoutFullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.fullName)}
                />

                {errors.fullName && (
                  <small className="checkout-error">{errors.fullName}</small>
                )}
              </div>

              {/* Email */}
              <div className="checkout-field">
                <label htmlFor="checkoutEmail">Email Address</label>

                <input
                  id="checkoutEmail"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                />

                {errors.email && (
                  <small className="checkout-error">{errors.email}</small>
                )}
              </div>

              {/* Phone */}
              <div className="checkout-field">
                <label htmlFor="checkoutPhone">Phone Number</label>

                <input
                  id="checkoutPhone"
                  name="phone"
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.phone)}
                />

                {errors.phone && (
                  <small className="checkout-error">{errors.phone}</small>
                )}
              </div>

              {/* City */}
              <div className="checkout-field">
                <label htmlFor="checkoutCity">City / District</label>

                <input
                  id="checkoutCity"
                  name="city"
                  type="text"
                  placeholder="Enter your city or district"
                  value={formData.city}
                  onChange={handleChange}
                  autoComplete="address-level2"
                  aria-invalid={Boolean(errors.city)}
                />

                {errors.city && (
                  <small className="checkout-error">{errors.city}</small>
                )}
              </div>

              {/* Address */}
              <div className="checkout-field full-width">
                <label htmlFor="checkoutAddress">Full Delivery Address</label>

                <textarea
                  id="checkoutAddress"
                  name="address"
                  rows="4"
                  placeholder="House, road, area, city and other details"
                  value={formData.address}
                  onChange={handleChange}
                  autoComplete="street-address"
                  aria-invalid={Boolean(errors.address)}
                />

                {errors.address && (
                  <small className="checkout-error">{errors.address}</small>
                )}
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section className="checkout-card">
            <div className="checkout-section-heading">
              <span className="checkout-step-number">2</span>

              <div>
                <h2>Payment Method</h2>

                <p>Choose your preferred payment method.</p>
              </div>
            </div>

            <div className="payment-options">
              <label
                className={`payment-option ${
                  paymentMethod === 'cod' ? 'payment-option-active' : ''
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                />

                <span className="payment-option-icon">💵</span>

                <span className="payment-option-content">
                  <strong>Cash on Delivery</strong>

                  <small>Pay when your order arrives.</small>
                </span>
              </label>

              <label
                className={`payment-option ${
                  paymentMethod === 'mobile-banking'
                    ? 'payment-option-active'
                    : ''
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="mobile-banking"
                  checked={paymentMethod === 'mobile-banking'}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                />

                <span className="payment-option-icon">📱</span>

                <span className="payment-option-content">
                  <strong>Mobile Banking</strong>

                  <small>
                    Online mobile payment integration will be added later.
                  </small>
                </span>
              </label>

              <label
                className={`payment-option ${
                  paymentMethod === 'card' ? 'payment-option-active' : ''
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                />

                <span className="payment-option-icon">💳</span>

                <span className="payment-option-content">
                  <strong>Bank Card</strong>

                  <small>
                    Secure card payment integration will be added later.
                  </small>
                </span>
              </label>
            </div>

            <p className="payment-demo-notice">
              Demo only: selecting a payment method does not process a payment.
            </p>
          </section>
        </div>

        {/* Order Summary */}
        <aside className="checkout-summary">
          <div className="checkout-summary-heading">
            <h2>Order Summary</h2>

            <span>{cartCount} items</span>
          </div>

          {/* Product List */}
          <div className="checkout-order-items">
            {cartItems.map((item) => (
              <div className="checkout-order-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="checkout-order-item-info">
                  <h3>{item.name}</h3>

                  <p>Quantity: {item.quantity}</p>

                  <span>৳{item.price.toLocaleString('en-BD')} each</span>
                </div>

                <strong>
                  ৳{(item.price * item.quantity).toLocaleString('en-BD')}
                </strong>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="checkout-price-row">
            <span>Subtotal</span>

            <strong>৳{subtotal.toLocaleString('en-BD')}</strong>
          </div>

          <div className="checkout-price-row">
            <span>Delivery Charge</span>

            <strong className="free-delivery">Free</strong>
          </div>

          <div className="checkout-summary-divider"></div>

          <div className="checkout-total-row">
            <span>Total Payable</span>

            <strong>৳{totalPrice.toLocaleString('en-BD')}</strong>
          </div>

          {successMessage && (
            <div className="checkout-message" role="status">
              {successMessage}
            </div>
          )}

          <button type="submit" className="place-order-button">
            Place Order →
          </button>

          <p className="checkout-security-note">
            🔒 Your information should be securely processed by the backend.
          </p>

          <button
            type="button"
            className="checkout-back-button"
            onClick={() => navigate('/cart')}
          >
            ← Return to Cart
          </button>

          <button
            type="button"
            className="checkout-clear-button"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </aside>
      </form>
    </main>
  );
}

export default Checkout;
