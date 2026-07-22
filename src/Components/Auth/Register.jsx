import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaChevronLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import './Auth.css';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrors({});
    
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }
    if (!repeatPassword.trim()) {
      newErrors.repeatPassword = 'Please repeat your password';
    }
    if (password && repeatPassword && password !== repeatPassword) {
      newErrors.repeatPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await register({ name: username, email, password });
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

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (errors.username) {
      setErrors(prev => ({ ...prev, username: undefined }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
  };

  const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
    if (errors.repeatPassword) {
      setErrors(prev => ({ ...prev, repeatPassword: undefined }));
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
          <h2>Sign Up</h2>
          <p className="auth-subtitle">Create an account.</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={handleEmailChange} 
                placeholder="Enter email"
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Username or email</label>
              <input 
                type="text" 
                value={username} 
                onChange={handleUsernameChange} 
                placeholder="Enter username or email"
                className={errors.username ? 'input-error' : ''}
              />
              {errors.username && <span className="error-message">{errors.username}</span>}
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
            </div>

            <div className="form-group">
              <label>Repeat Password</label>
              <div className="password-input-wrapper">
                <input 
                  type={showRepeatPassword ? 'text' : 'password'} 
                  value={repeatPassword} 
                  onChange={handleRepeatPasswordChange} 
                  placeholder="Enter password again"
                  className={errors.repeatPassword ? 'input-error' : ''}
                />
                <button 
                  type="button" 
                  className="password-toggle" 
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                >
                  {showRepeatPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.repeatPassword && <span className="error-message">{errors.repeatPassword}</span>}
            </div>

            <button type="submit" className="auth-submit-btn">Sign Up</button>
          </form>

          <p className="auth-redirect">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
