import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Recycle, Truck, Shield } from 'lucide-react';
import products from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const featured = products.filter(p => p.badge === 'Best Seller' || p.badge === 'Top Rated');

  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-tag"><Leaf size={14} /> Sustainable Living</span>
          <h1>Shop for the Planet,<br />Not Against It</h1>
          <p>Discover eco-friendly products that make a difference. Every purchase supports a greener future.</p>
          <div className="hero-actions">
            <Link to="/products" className="btn-primary">
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link to="/products?category=Kitchen" className="btn-secondary">
              Explore Kitchen
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=500&fit=crop" alt="Sustainable living" />
        </div>
      </section>

      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <Leaf size={28} />
            <h3>100% Eco-Friendly</h3>
            <p>All products are sustainably sourced and environmentally safe</p>
          </div>
          <div className="feature-card">
            <Recycle size={28} />
            <h3>Zero Waste Packaging</h3>
            <p>Plastic-free, compostable, or recyclable packaging always</p>
          </div>
          <div className="feature-card">
            <Truck size={28} />
            <h3>Carbon Neutral Shipping</h3>
            <p>We offset 100% of shipping emissions automatically</p>
          </div>
          <div className="feature-card">
            <Shield size={28} />
            <h3>Quality Guarantee</h3>
            <p>30-day money-back guarantee on every product</p>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <Link to="/products" className="view-all">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="products-grid">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          {['Kitchen', 'Personal Care', 'Accessories', 'Electronics', 'Home'].map(cat => (
            <Link to={`/products?category=${cat}`} key={cat} className="category-card">
              <h3>{cat}</h3>
              <p>{products.filter(p => p.category === cat).length} products</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Join the Movement</h2>
          <p>Subscribe to get exclusive deals, new product launches, and sustainability tips.</p>
          <form className="cta-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
