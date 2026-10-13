import { useState } from 'react';
import { Link } from 'react-router-dom';

import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Input-এর Value পরিবর্তন হলে State আপডেট হবে
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    // ব্যবহারকারী পরিবর্তন করলে আগের Error সরানো হবে
    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: '',
    }));

    setSuccessMessage('');
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

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must contain at least 8 characters.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    return newErrors;
  }

  // Form Submit
  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // আপাতত শুধু Frontend Demo
    setSuccessMessage(
      'Form validation successful! Backend registration will be added later.'
    );

    console.log('Registration form data:', {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
    });
  }

  return (
    <main className="auth-page">
      <section className="auth-card register-card">
        {/* Left Side */}
        <div className="auth-visual">
          <Link to="/" className="auth-brand">
            Shop<span>Zone</span>
          </Link>

          <div className="auth-visual-content">
            <span className="auth-visual-label">WELCOME TO SHOPZONE</span>

            <h1>
              Your next
              <br />
              favorite find
              <br />
              is waiting.
            </h1>

            <p>
              Create your account to enjoy a more personalized shopping
              experience.
            </p>

            <div className="auth-feature-list">
              <p>✓ Discover exciting products</p>
              <p>✓ Keep track of your shopping</p>
              <p>✓ Enjoy a simpler checkout</p>
            </div>
          </div>

          <span className="auth-visual-footer">
            Your style. Your choice. Your ShopZone.
          </span>
        </div>

        {/* Right Side */}
        <div className="auth-form-container">
          <div className="auth-form-heading">
            <span className="auth-eyebrow">CREATE YOUR ACCOUNT</span>

            <h2>Join ShopZone</h2>

            <p>Enter your details to create your account.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div className="auth-field">
              <label htmlFor="fullName">Full Name</label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                autoComplete="name"
                aria-invalid={Boolean(errors.fullName)}
              />

              {errors.fullName && (
                <small className="auth-error">{errors.fullName}</small>
              )}
            </div>

            {/* Email */}
            <div className="auth-field">
              <label htmlFor="registerEmail">Email Address</label>

              <input
                id="registerEmail"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
              />

              {errors.email && (
                <small className="auth-error">{errors.email}</small>
              )}
            </div>

            {/* Phone */}
            <div className="auth-field">
              <label htmlFor="phone">Phone Number</label>

              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
                aria-invalid={Boolean(errors.phone)}
              />

              {errors.phone && (
                <small className="auth-error">{errors.phone}</small>
              )}
            </div>

            {/* Password */}
            <div className="auth-field">
              <label htmlFor="registerPassword">Password</label>

              <div className="password-input-wrapper">
                <input
                  id="registerPassword"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  aria-invalid={Boolean(errors.password)}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              {errors.password && (
                <small className="auth-error">{errors.password}</small>
              )}
            </div>

            {/* Confirm Password */}
            <div className="auth-field">
              <label htmlFor="confirmPassword">Confirm Password</label>

              <div className="password-input-wrapper">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Enter your password again"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  aria-invalid={Boolean(errors.confirmPassword)}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword((previous) => !previous)
                  }
                  aria-label={
                    showConfirmPassword
                      ? 'Hide confirm password'
                      : 'Show confirm password'
                  }
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              {errors.confirmPassword && (
                <small className="auth-error">{errors.confirmPassword}</small>
              )}
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="auth-success" role="status">
                {successMessage}
              </div>
            )}

            <button type="submit" className="auth-submit-button">
              Create Account →
            </button>
          </form>

          <p className="auth-switch-text">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>

          <p className="auth-terms">
            By creating an account, you agree to our
            <span> Terms of Service</span> and
            <span> Privacy Policy</span>.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;
