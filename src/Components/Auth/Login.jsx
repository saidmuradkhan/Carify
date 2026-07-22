import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaChevronLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import './Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrors({});
    
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Username or email is required';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <button className="auth-back-btn" onClick={() => navigate(-1)}>
          <FaChevronLeft /> Back
        </button>
        <div className="auth-brand-overlay">
          <img src="https://carify-llc.fra1.cdn.digitaloceanspaces.com/uploads/logo/logo.webp" alt="Carify Logo" className="auth-brand-img" />
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-wrapper">
          <h2>Login</h2>
          <p className="auth-subtitle">Log in to continue to your account.</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Username or email</label>
              <input 
                type="text" 
                value={email} 
                onChange={handleEmailChange} 
                placeholder="Enter username or email"
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-input-wrapper">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password} 
                  onChange={handlePasswordChange} 
                  placeholder="Enter password"
                  className={errors.password ? 'input-error' : ''}
                />
                <button 
                  type="button" 
                  className="password-toggle" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
              <a href="#" className="forgot-password-link">Forgot your password?</a>
            </div>

            <button type="submit" className="auth-submit-btn">Login</button>
          </form>

          <p className="auth-redirect">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
