import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './LoginPage.css';
import { LogIn, Mail, Lock, Loader2, ShieldCheck, ArrowRight } from 'lucide-react';
import logo from '../../assets/images/logo.png';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('/auth/signin', { email, password });
      const { token, refreshToken, ...userData } = response.data;
      login(token, refreshToken, {
        id: userData.id,
        email: userData.email,
        roles: userData.roles,
      });
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-brand-side animate-fade-in">
        <div className="brand-content">
          <img src={logo} alt="CampusOps Logo" className="brand-logo" />
          <h2 className="brand-tagline">Integrated Campus Management</h2>
          <p className="brand-description">
            Streamlining administrative workflows and academic experiences through a unified, secure platform.
          </p>
          <div className="feature-badges">
            <div className="badge"><ShieldCheck size={16} /> Secure Access</div>
            <div className="badge"><ArrowRight size={16} /> Fast Processing</div>
          </div>
        </div>
        <div className="brand-footer">
          © 2026 CampusOps. All rights reserved.
        </div>
      </div>

      <div className="login-form-side">
        <div className="login-card glass animate-slide-up">
          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Please enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message animate-fade-in">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-group">
                <Mail className="input-icon" size={18} />
                <input
                  id="email"
                  type="email"
                  placeholder="name@uemf.ac.ma"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-group">
                <Lock className="input-icon" size={18} />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button type="submit" className="login-button hover-lift" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <LogIn size={20} />
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <a href="/forgot-password">Forgot your password?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
