import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
        await signup(formData.name, formData.email, formData.password);
        navigate('/dashboard');
      } catch (err) {
        setServerError(err.response?.data?.message || 'Failed to create account');
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
          Start building
          <br />
          your collection
        </h2>
        <p className="text-stone text-sm mb-8">
          Save and preview every link that matters — all in one place.
        </p>

        {/* ── Server error ─────────────────────────────────── */}
        {serverError && (
          <div className="bg-brick/10 border border-brick/20 text-brick p-3 rounded-xl mb-6 text-sm">
            {serverError}
          </div>
        )}

        {/* ── Form ─────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="signup-name" className="auth-label">
              Name
            </label>
            <input
              id="signup-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="auth-input"
              placeholder="Jane Doe"
              autoComplete="name"
            />
            {errors.name && (
              <p className="text-brick text-xs mt-1.5">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="signup-email" className="auth-label">
              Email
            </label>
            <input
              id="signup-email"
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
            <label htmlFor="signup-password" className="auth-label">
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="auth-input"
              placeholder="••••••••"
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-brick text-xs mt-1.5">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="signup-confirm" className="auth-label">
              Confirm Password
            </label>
            <input
              id="signup-confirm"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="auth-input"
              placeholder="••••••••"
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <p className="text-brick text-xs mt-1.5">{errors.confirmPassword}</p>
            )}
          </div>

          <button type="submit" disabled={loading} className="auth-btn mt-2">
            {loading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* ── Footer link ──────────────────────────────────── */}
        <p className="text-center text-stone mt-8 text-sm">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-sage hover:underline underline-offset-4 transition-colors duration-200"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
