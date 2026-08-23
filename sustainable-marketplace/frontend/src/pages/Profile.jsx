import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Package, LogOut, ShoppingBag } from 'lucide-react';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          <User size={40} />
        </div>
        <h1>{user.name}</h1>
        <p className="profile-email"><Mail size={16} /> {user.email}</p>

        <div className="profile-actions">
          <Link to="/orders" className="profile-action">
            <Package size={20} />
            <span>My Orders</span>
          </Link>
          <Link to="/cart" className="profile-action">
            <ShoppingBag size={20} />
            <span>My Cart</span>
          </Link>
          <button className="profile-action logout" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
