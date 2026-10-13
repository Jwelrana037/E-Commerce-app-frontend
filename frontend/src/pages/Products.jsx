
import { useState } from "react";

import ProductCard from "../components/ProductCard";
import products from "../data/products";

import "./Products.css";

function Products() {
  // Search input-এর value
  const [search, setSearch] = useState("");

  // Selected category
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  // Sorting option
  const [sortBy, setSortBy] = useState("default");

  // Maximum price filter
  const [maxPrice, setMaxPrice] = useState(10000);

  // Available categories
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const matchesPrice = product.price <= maxPrice;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice
      );
    })
    .sort((a, b) => {
      if (sortBy === "low-to-high") {
        return a.price - b.price;
      }

      if (sortBy === "high-to-low") {
        return b.price - a.price;
      }

      return 0;
    });

  // Reset all filters
  function handleClearFilters() {
    setSearch("");
    setSelectedCategory("All");
    setSortBy("default");
    setMaxPrice(10000);
  }

  return (
    <main className="products-page">

      {/* Page Header */}

      <section className="products-header">
        <div>
          <span className="products-eyebrow">
            OUR COLLECTION
          </span>

          <h1>Explore Our Products</h1>

          <p>
            Discover quality products at great prices.
          </p>
        </div>
      </section>

      {/* Products Layout */}

      <section className="products-layout">

        {/* Filter Sidebar */}

        <aside className="products-sidebar">

          <div className="filter-heading">
            <h2>Filters</h2>

            <button
              type="button"
              onClick={handleClearFilters}
              className="clear-filters"
            >
              Clear All
            </button>
          </div>

          {/* Search */}

          <div className="filter-group">
            <label htmlFor="product-search">
              Search Products
            </label>

            <input
              id="product-search"
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          {/* Category Filter */}

          <div className="filter-group">
            <label htmlFor="category-filter">
              Category
            </label>

            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(event) =>
                setSelectedCategory(event.target.value)
              }
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price Filter */}

          <div className="filter-group">
            <label htmlFor="price-filter">
              Maximum Price
            </label>

            <input
              id="price-filter"
              type="range"
              min="500"
              max="10000"
              step="100"
              value={maxPrice}
              onChange={(event) =>
                setMaxPrice(Number(event.target.value))
              }
            />

            <div className="price-range-labels">
              <span>৳500</span>

              <strong>
                ৳{maxPrice.toLocaleString("en-BD")}
              </strong>
            </div>
          </div>

          {/* Sorting */}

          <div className="filter-group">
            <label htmlFor="sort-filter">
              Sort Products
            </label>

            <select
              id="sort-filter"
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value)
              }
            >
              <option value="default">
                Default
              </option>

              <option value="low-to-high">
                Price: Low to High
              </option>

              <option value="high-to-low">
                Price: High to Low
              </option>
            </select>
          </div>

        </aside>

        {/* Product Results */}

        <div className="products-content">

          <div className="products-toolbar">
            <p>
              Showing{" "}
              <strong>{filteredProducts.length}</strong>{" "}
              of{" "}
              <strong>{products.length}</strong>{" "}
              products
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="products-grid">

              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}

            </div>
          ) : (
            <div className="products-empty">

              <span>🔎</span>

              <h2>No Products Found</h2>

              <p>
                Try changing your search or filters.
              </p>

              <button
                type="button"
                onClick={handleClearFilters}
              >
                Clear Filters
              </button>

            </div>
          )}

        </div>

      </section>

    </main>
  );
}

export default Products;

