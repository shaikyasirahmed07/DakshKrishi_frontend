import './css/FarmerRegister.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function FarmerRegister() {
  const [farmerData, setFarmerData] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    isApproved: false, // Default state for admin approval
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFarmerData((prevState) => ({ ...prevState, [name]: value }));
    setError(null); // Reset error state on input change
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('https://dakshkrish-backend-production.up.railway.app/api/farmers/farmer-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(farmerData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Registration failed');
      }

      const message = await response.text();
      setSuccess(message);

      // Reset form data
      setFarmerData({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        isApproved: false,
      });

      // Redirect to login page after delay
      setTimeout(() => navigate('/farmer-login'), 2000);
    } catch (error) {
      setError(error.message || 'An unexpected error occurred');
    }
  };

  return (
    <div className="container">
      <div className="register-box">
        <h2>Register as Farmer</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={farmerData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={farmerData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={farmerData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={farmerData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account?{' '}
          <Link to="/farmer-login" className="login-link">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default FarmerRegister;
