import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/Home.css';

function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home">
      <h1>login app</h1>
      <p><b>Register, login and view your dashboard.</b></p>
      {isAuthenticated ? (
        <Link to="/dashboard" className="home-btn">Go to dashboard<br></br> {user?.name}</Link>
      ) : (
        <div className="home-actions">
          <Link to="/register" className="home-btn">Get started</Link>
          <Link to="/login" className="home-btn outline">Login</Link>
        </div>
      )}
    </div>
  );
}

export default Home;
