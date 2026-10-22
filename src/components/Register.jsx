import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/AuthContext.css';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password.length < 6) return setError('Password must be at least 6 characters');
    if (form.password !== form.confirm) return setError('Passwords do not match');

    setSubmitting(true);
    const result = await register(form.name, form.email, form.password);
    setSubmitting(false);

    if (result.success) navigate('/dashboard');
    else setError(result.message);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create account</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Confirm password</label>
            <input type="password" name="confirm" value={form.confirm} onChange={handleChange} required />
          </div>
          <button type="submit" className="auth-btn" disabled={submitting}>
            {submitting ? 'Creating...' : 'Register'}
          </button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
