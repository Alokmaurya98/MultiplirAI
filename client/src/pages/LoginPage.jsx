import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      setServerError('');
      try {
        await login(formData.email, formData.password);
        navigate('/dashboard');
      } catch (err) {
        setServerError(err.response?.data?.message || 'Invalid email or password');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-[420px] auth-glass-card p-8 sm:p-10 opacity-0 motion-safe:animate-auth-enter motion-reduce:opacity-100">
        {/* ── Heading ──────────────────────────────────────── */}
        <h2
          className="font-display text-parchment tracking-tight mb-2"
          style={{ fontSize: '2.5rem', lineHeight: 1.1 }}
        >
          Sign in to
          <br />
          your collection
        </h2>
        <p className="text-stone text-sm mb-8">
          Pick up where you left off with your saved previews.
        </p>

        {/* ── Server error ─────────────────────────────────── */}
        {serverError && (
          <div className="bg-brick/10 border border-brick/20 text-brick p-3 rounded-xl mb-6 text-sm">
            {serverError}
          </div>
        )}

        {/* ── Form ─────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="login-email" className="auth-label">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="auth-input"
              placeholder="you@example.com"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-brick text-xs mt-1.5">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="login-password" className="auth-label">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="auth-input"
              placeholder="••••••••"
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="text-brick text-xs mt-1.5">{errors.password}</p>
            )}
          </div>

          <button type="submit" disabled={loading} className="auth-btn mt-2">
            {loading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* ── Footer link ──────────────────────────────────── */}
        <p className="text-center text-stone mt-8 text-sm">
          No account yet?{' '}
          <Link
            to="/signup"
            className="text-sage hover:underline underline-offset-4 transition-colors duration-200"
          >
            Create one
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
