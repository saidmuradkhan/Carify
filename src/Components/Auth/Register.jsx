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
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !username || !password || !repeatPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    }

    const result = await register({ name: username, email, password });
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
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
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter email"
              />
            </div>

            <div className="form-group">
              <label>Username or email</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Enter username or email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-input-wrapper">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Enter password"
                />
                <button 
                  type="button" 
                  className="password-toggle" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Repeat Password</label>
              <div className="password-input-wrapper">
                <input 
                  type={showRepeatPassword ? 'text' : 'password'} 
                  value={repeatPassword} 
                  onChange={(e) => setRepeatPassword(e.target.value)} 
                  placeholder="Enter password again"
                />
                <button 
                  type="button" 
                  className="password-toggle" 
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                >
                  {showRepeatPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
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
