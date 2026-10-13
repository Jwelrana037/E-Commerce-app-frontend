import { Link } from 'react-router-dom';

import ProductCard from '../components/ProductCard';
import products from '../data/products';

import './Home.css';

const categories = [
  { id: 1, name: 'Electronics', icon: '🎧' },
  { id: 2, name: 'Fashion', icon: '👕' },
  { id: 3, name: 'Shoes', icon: '👟' },
  { id: 4, name: 'Watches', icon: '⌚' },
  { id: 5, name: 'Accessories', icon: '🎒' },
  { id: 6, name: 'Home & Living', icon: '🏠' },
];

function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <main className="home-page">
      {/* Hero Section */}

      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-label">NEW COLLECTION 2026</span>

          <h1>
            Discover Your
            <br />
            <span>Perfect Style</span>
          </h1>

          <p>
            Find your favorite products at amazing prices. Quality products,
            great deals, and a better shopping experience.
          </p>

          <div className="hero-buttons">
            <Link to="/products" className="hero-btn primary-btn">
              Shop Now →
            </Link>

            <Link to="/categories" className="hero-btn secondary-btn">
              Explore Categories
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <h3>1,000+</h3>
              <span>Products</span>
            </div>

            <div>
              <h3>500+</h3>
              <span>Customers</span>
            </div>

            <div>
              <h3>4.8/5</h3>
              <span>Customer Rating</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000"
            alt="ShopZone fashion collection"
          />

          <div className="hero-floating-card">
            <span>✨</span>

            <div>
              <strong>Special Offer</strong>
              <p>Up to 40% OFF</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}

      <section className="benefits-section">
        <div className="benefit-item">
          <span>🚚</span>

          <div>
            <h3>Free Delivery</h3>
            <p>On selected orders</p>
          </div>
        </div>

        <div className="benefit-item">
          <span>🔒</span>

          <div>
            <h3>Secure Payment</h3>
            <p>Protected checkout</p>
          </div>
        </div>

        <div className="benefit-item">
          <span>↩️</span>

          <div>
            <h3>Easy Returns</h3>
            <p>Simple return process</p>
          </div>
        </div>

        <div className="benefit-item">
          <span>🎧</span>

          <div>
            <h3>Customer Support</h3>
            <p>We're here to help</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}

      <section className="categories-section">
        <div className="section-heading">
          <div>
            <span className="section-label">SHOP BY CATEGORY</span>

            <h2>Explore Categories</h2>

            <p>Find exactly what you are looking for.</p>
          </div>

          <Link to="/categories" className="view-all-link">
            View All →
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Link to="/products" key={category.id} className="category-card">
              <div className="category-icon">{category.icon}</div>

              <h3>{category.name}</h3>

              <span>Explore →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}

      <section className="featured-section">
        <div className="section-heading">
          <div>
            <span className="section-label">HANDPICKED FOR YOU</span>

            <h2>Featured Products</h2>

            <p>Discover some of our most popular products.</p>
          </div>

          <Link to="/products" className="view-all-link">
            View All →
          </Link>
        </div>

        <div className="featured-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promotional Section */}

      <section className="promo-section">
        <div className="promo-content">
          <span>LIMITED TIME OFFER</span>

          <h2>
            Upgrade Your Style
            <br />
            Without Overspending.
          </h2>

          <p>
            Explore our latest collection and discover products you will love.
          </p>

          <Link to="/products" className="promo-button">
            Explore Deals →
          </Link>
        </div>

        <div className="promo-decoration">
          <span>40%</span>
          <p>OFF</p>
        </div>
      </section>
    </main>
  );
}

export default Home;
