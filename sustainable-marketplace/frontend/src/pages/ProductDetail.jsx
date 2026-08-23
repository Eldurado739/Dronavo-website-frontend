import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, Check, Truck, RotateCcw, Shield } from 'lucide-react';
import { useState } from 'react';
import products from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product not found</h2>
        <Link to="/products">Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-detail">
      <Link to="/products" className="back-link">
        <ArrowLeft size={18} /> Back to Shop
      </Link>

      <div className="detail-grid">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
          {product.badge && <span className="product-badge">{product.badge}</span>}
        </div>

        <div className="detail-info">
          <p className="product-category">{product.category}</p>
          <h1>{product.name}</h1>

          <div className="product-rating">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                fill={i < Math.floor(product.rating) ? '#f59e0b' : 'none'}
                stroke={i < Math.floor(product.rating) ? '#f59e0b' : '#d1d5db'}
              />
            ))}
            <span>{product.rating}</span>
            <span className="review-count">({product.reviews} reviews)</span>
          </div>

          <div className="detail-price">
            <span className="price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                <span className="discount">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          <p className="detail-description">{product.description}</p>

          {product.features && (
            <div className="features-list">
              {product.features.map((f, i) => (
                <span key={i} className="feature-tag">
                  <Check size={14} /> {f}
                </span>
              ))}
            </div>
          )}

          <div className="quantity-selector">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          <button
            className={`add-to-cart-btn large ${added ? 'added' : ''}`}
            onClick={handleAddToCart}
          >
            {added ? (
              <>Added to Cart!</>
            ) : (
              <><ShoppingCart size={18} /> Add to Cart - ${(product.price * quantity).toFixed(2)}</>
            )}
          </button>

          <div className="guarantees">
            <div><Truck size={16} /> Free shipping over $50</div>
            <div><RotateCcw size={16} /> 30-day returns</div>
            <div><Shield size={16} /> Quality guarantee</div>
          </div>
        </div>
      </div>
    </div>
  );
}
