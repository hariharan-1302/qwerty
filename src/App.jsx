import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <p className="loading">Loading...</p>;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
