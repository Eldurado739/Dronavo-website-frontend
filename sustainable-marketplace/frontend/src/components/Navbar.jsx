import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Leaf, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [search, setSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <Leaf size={24} />
          <span>EcoMarket</span>
        </Link>

        <form className="nav-search" onSubmit={handleSearch}>
          <Search size={18} />
          <input
            type="text"
            placeholder="Search sustainable products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          <Link to="/products" onClick={() => setMobileOpen(false)}>Shop</Link>
          {user ? (
            <>
              <Link to="/profile" onClick={() => setMobileOpen(false)}>
                <User size={18} /> {user.name.split(' ')[0]}
              </Link>
              <Link to="/cart" className="cart-link" onClick={() => setMobileOpen(false)}>
                <ShoppingCart size={18} />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
              <button className="nav-btn" onClick={() => { logout(); setMobileOpen(false); }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileOpen(false)}>Login</Link>
              <Link to="/register" className="nav-btn-primary" onClick={() => setMobileOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>

        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}
