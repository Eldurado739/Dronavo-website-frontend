import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CreditCard, MapPin, CheckCircle } from 'lucide-react';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({
    address: '', city: '', zip: '', card: '', expiry: '', cvv: ''
  });

  const shipping = cartTotal >= 50 ? 0 : 5.99;
  const total = cartTotal + shipping;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const orders = JSON.parse(localStorage.getItem('sustain_orders') || '[]');
    orders.push({
      id: Date.now(),
      items: [...cart],
      total,
      date: new Date().toISOString(),
      status: 'Confirmed',
      address: `${form.address}, ${form.city} ${form.zip}`
    });
    localStorage.setItem('sustain_orders', JSON.stringify(orders));
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="order-success">
        <CheckCircle size={64} />
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for choosing sustainable products. Your order is confirmed.</p>
        <div className="success-actions">
          <button className="btn-primary" onClick={() => navigate('/orders')}>
            View Orders
          </button>
          <button className="btn-secondary" onClick={() => navigate('/products')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-steps">
        <span className={step >= 1 ? 'active' : ''}>1. Shipping</span>
        <span className={step >= 2 ? 'active' : ''}>2. Payment</span>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={step === 1 ? (e) => { e.preventDefault(); setStep(2); } : handlePlaceOrder}>
          {step === 1 && (
            <>
              <h2><MapPin size={20} /> Shipping Address</h2>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="123 Green Street"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    placeholder="Mumbai"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>ZIP Code</label>
                  <input
                    type="text"
                    placeholder="400001"
                    value={form.zip}
                    onChange={(e) => setForm({ ...form, zip: e.target.value })}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary full-width">
                Continue to Payment
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2><CreditCard size={20} /> Payment Details</h2>
              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={form.card}
                  onChange={(e) => setForm({ ...form, card: e.target.value })}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={form.expiry}
                    onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={form.cvv}
                    onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="step-actions">
                <button type="button" className="btn-secondary" onClick={() => setStep(1)}>
                  Back
                </button>
                <button type="submit" className="btn-primary">
                  Place Order - ${total.toFixed(2)}
                </button>
              </div>
            </>
          )}
        </form>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          {cart.map(item => (
            <div key={item.id} className="summary-item">
              <img src={item.image} alt={item.name} />
              <div>
                <p>{item.name}</p>
                <p className="summary-item-detail">Qty: {item.quantity} x ${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
