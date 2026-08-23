import { Link } from 'react-router-dom';
import { Package, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Orders() {
  const { user } = useAuth();
  const orders = user
    ? JSON.parse(localStorage.getItem('sustain_orders') || '[]').reverse()
    : [];

  if (!user) {
    return (
      <div className="empty-orders">
        <Package size={64} />
        <h2>Please login to view orders</h2>
        <Link to="/login" className="btn-primary">Login</Link>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="empty-orders">
        <ShoppingBag size={64} />
        <h2>No orders yet</h2>
        <p>Start shopping to see your orders here.</p>
        <Link to="/products" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <Link to="/profile" className="back-link">
        <ArrowLeft size={18} /> Back to Profile
      </Link>
      <h1>My Orders</h1>

      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div>
                <p className="order-id">Order #{order.id}</p>
                <p className="order-date">
                  {new Date(order.date).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </p>
              </div>
              <span className={`order-status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>

            <div className="order-items">
              {order.items.map(item => (
                <div key={item.id} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p>{item.name}</p>
                    <p className="order-item-detail">Qty: {item.quantity} x ${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <p className="order-address">Ship to: {order.address}</p>
              <p className="order-total">Total: ${order.total.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
