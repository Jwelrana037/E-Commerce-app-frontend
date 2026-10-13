import { Link } from 'react-router-dom';
import  products  from '../data/products';
import './Categories.css';

const categoryList = [
  {
    name: 'Electronics',
    icon: '🎧',
    description: 'Discover the latest electronic gadgets.',
  },
  {
    name: 'Watches',
    icon: '⌚',
    description: 'Find stylish watches for every occasion.',
  },
  {
    name: 'Shoes',
    icon: '👟',
    description: 'Explore comfortable and trendy footwear.',
  },
  {
    name: 'Accessories',
    icon: '🎒',
    description: 'Complete your look with stylish accessories.',
  },
  {
    name: 'Clothing',
    icon: '👕',
    description: 'Discover your everyday fashion essentials.',
  },
];

function Categories() {
  return (
    <main className="categories-page">
      <section className="categories-hero">
        <p className="categories-eyebrow">EXPLORE SHOPZONE</p>

        <h1>Shop by Category</h1>

        <p>
          Find your favorite products from our carefully selected categories.
        </p>
      </section>

      <section className="categories-grid">
        {categoryList.map((category) => {
          const productCount = products.filter(
            (product) => product.category === category.name
          ).length;

          return (
            <Link
              key={category.name}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="category-card"
            >
              <div className="category-icon">{category.icon}</div>

              <h2>{category.name}</h2>

              <p>{category.description}</p>

              <span>
                {productCount} products <span aria-hidden="true">→</span>
              </span>
            </Link>
          );
        })}
      </section>
    </main>
  );
}

export default Categories;
