import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/FarmerLogin.css';

const FarmerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/farmers/farmer-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const result = await response.json();

      if (result.message === 'Login successful') {
        localStorage.setItem('farmerId', result.farmerId); // Store farmer ID in localStorage
        navigate(`/farmers/products/${result.farmerId}`); // Navigate to farmer's product page
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
      <h4>Welcome To DakshKrishi</h4>
        <h2>Farmer Login</h2>
        <p className="subtitle">Access the platform and manage your activities</p>
        <p className="subtitle">Enter your credentials to sign in</p>
        <form onSubmit={handleSubmit} className="form-container">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="form-input"
            />
          </div>
          
          <button type="submit" disabled={isLoading} className="login-button">
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FarmerLogin;
