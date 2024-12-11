import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/LoginPage.css'; // Make sure this CSS file matches MainPage.css

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://dakshkrish-backend-production.up.railway.app/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store userId in localStorage
        localStorage.setItem('userId', data.userId);

        // Redirect to home page with the userId
        navigate(`/home/${data.userId}`);
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred while trying to log in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <div className="content-wrapper">
        <h1 className="title">Login to DakshKrishi</h1>
        <p className="subtitle">Access the platform and manage your activities</p>
        <p className="subtitle">Enter your credentials to sign in</p>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="form-input"
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading} className="button user-button">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
