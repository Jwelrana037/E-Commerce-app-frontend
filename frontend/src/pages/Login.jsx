import { useState } from 'react';
import { Link } from 'react-router-dom';

import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  // Input State Update
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

    setMessage('');
  }

  // Validation
  function validateForm() {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }

    return newErrors;
  }

  // Submit
  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // আপাতত Frontend Demo
    setMessage(
      'Form validation successful! Backend login will be added later.'
    );

    console.log('Login form submitted:', {
      email: formData.email,
      rememberMe,
    });
  }

  return (
    <main className="auth-page">
      <section className="auth-card login-card">
        {/* Left Side */}
        <div className="auth-visual">
          <Link to="/" className="auth-brand">
            Shop<span>Zone</span>
          </Link>

          <div className="auth-visual-content">
            <span className="auth-visual-label">WELCOME BACK</span>

            <h1>
              Great to see
              <br />
              you again.
            </h1>

            <p>
              Sign in to continue exploring your favorite products and shopping
              with ShopZone.
            </p>

            <div className="auth-feature-list">
              <p>✓ Explore our latest collection</p>
              <p>✓ Manage your shopping cart</p>
              <p>✓ Enjoy a personalized experience</p>
            </div>
          </div>

          <span className="auth-visual-footer">
            Your style. Your choice. Your ShopZone.
          </span>
        </div>

        {/* Right Side */}
        <div className="auth-form-container">
          <div className="auth-form-heading">
            <span className="auth-eyebrow">ACCOUNT LOGIN</span>

            <h2>Sign In</h2>

            <p>Enter your account details to continue.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="auth-field">
              <label htmlFor="loginEmail">Email Address</label>

              <input
                id="loginEmail"
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

            {/* Password */}
            <div className="auth-field">
              <label htmlFor="loginPassword">Password</label>

              <div className="password-input-wrapper">
                <input
                  id="loginPassword"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
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

            {/* Remember Me */}
            <div className="login-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />

                <span>Remember me</span>
              </label>

              <Link to="/forgot-password" className="forgot-password-link">
                Forgot password?
              </Link>
            </div>

            {/* Message */}
            {message && (
              <div className="auth-success" role="status">
                {message}
              </div>
            )}

            <button type="submit" className="auth-submit-button">
              Sign In →
            </button>
          </form>

          <p className="auth-switch-text">
            Don't have an account? <Link to="/register">Create account</Link>
          </p>

          <p className="auth-terms">Your account security matters to us.</p>
        </div>
      </section>
    </main>
  );
}

export default Login;
