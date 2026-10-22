import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/Navbar.css';

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">AuthApp</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <span className="nav-user">Hi, {user?.name}</span>
            <button onClick={handleLogout} className="nav-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="nav-btn">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
