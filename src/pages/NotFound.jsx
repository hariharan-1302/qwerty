import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

function NotFound() {
  return (
    <div className="notfound">
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/" className="notfound-btn">Back to home</Link>
    </div>
  );
}

export default NotFound;
