import { Link } from 'react-router-dom';
import { Leaf, Globe, MessageCircle, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <Leaf size={20} />
              <span>EcoMarket</span>
            </Link>
            <p>Making sustainable living accessible to everyone. Every purchase makes a difference.</p>
            <div className="social-links">
              <a href="#"><Globe size={18} /></a>
              <a href="#"><MessageCircle size={18} /></a>
              <a href="#"><Heart size={18} /></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Shop</h4>
            <Link to="/products">All Products</Link>
            <Link to="/products?category=Kitchen">Kitchen</Link>
            <Link to="/products?category=Personal Care">Personal Care</Link>
            <Link to="/products?category=Accessories">Accessories</Link>
          </div>
          <div className="footer-col">
            <h4>About</h4>
            <Link to="#">Our Story</Link>
            <Link to="#">Sustainability</Link>
            <Link to="#">Blog</Link>
            <Link to="#">Press</Link>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <Link to="#">Contact Us</Link>
            <Link to="#">FAQs</Link>
            <Link to="#">Shipping</Link>
            <Link to="#">Returns</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 EcoMarket. All rights reserved. Made with care for our planet.</p>
        </div>
      </div>
    </footer>
  );
}
