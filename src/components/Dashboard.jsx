// https://claude.ai/chat/778610a4-14f0-4ca5-a315-6b2268ba9c39
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/Dashboard.css';

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get('/auth/me');
        setProfile(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          logout();
          navigate('/login');
        } else {
          setError('Could not load profile from server');
        }
      }
    };
    loadProfile();
  }, []);

  if (error) return <p className="loading">{error}</p>;
  if (!profile) return <p className="loading">Loading...</p>;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dash-card">
        <h2>{profile.name}</h2>
        <p>{profile.email}</p>
        <p className="dash-meta">
          Member since {new Date(profile.createdAt).toLocaleDateString()}
        </p>
        <p className="dash-meta">User ID: {profile.id}</p>
      </div>
    </div>
  );
}

export default Dashboard;
