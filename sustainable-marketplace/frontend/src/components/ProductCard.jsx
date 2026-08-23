import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-link">
        <img src={product.image} alt={product.name} className="product-image" />
        {product.badge && <span className="product-badge">{product.badge}</span>}
      </Link>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <div className="product-rating">
          <Star size={14} fill="#f59e0b" stroke="#f59e0b" />
          <span>{product.rating}</span>
          <span className="review-count">({product.reviews})</span>
        </div>
        <div className="product-price">
          <span className="price">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
          <ShoppingCart size={16} /> Add to Cart
        </button>
      </div>
    </div>
  );
}
