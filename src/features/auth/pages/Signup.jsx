import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { StarBackground } from '../../shared/components/StarBackground';
import { Eye, EyeOff, UserPlus, User, Mail, Phone, Lock, Shield } from 'lucide-react';

const Signup = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'admin',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const validate = () => {
    if (form.fullName.trim().length < 3)
      return 'Full name must be at least 3 characters.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return 'Please enter a valid email address.';
    if (!/^\d{10}$/.test(form.phone))
      return 'Phone number must be exactly 10 digits.';
    if (form.password.length < 8)
      return 'Password must be at least 8 characters.';
    if (form.password !== form.confirmPassword)
      return 'Passwords do not match.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    setLoading(true);

    try {
      const result = await signup(
        form.fullName,
        form.email,
        form.phone,
        form.password,
        form.role
      );
      if (result.type === 'auth/signup/rejected') {
        setError(result.payload || 'Signup failed. Please try again.');
      } else {
        navigate('/admin');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Shared input style helpers
  const inputBase = {
    background: 'hsla(222,47%,11%,0.95)',
    border: '1px solid hsl(217,33%,28%)',
    color: 'hsl(213,31%,93%)',
  };
  const onFocusInput = (e) => {
    e.target.style.border = '1px solid hsl(250,65%,65%)';
    e.target.style.boxShadow = '0 0 0 3px hsla(250,65%,65%,0.15)';
  };
  const onBlurInput = (e) => {
    e.target.style.border = '1px solid hsl(217,33%,28%)';
    e.target.style.boxShadow = 'none';
  };

  const InputWrapper = ({ label, icon: Icon, children }) => (
    <div className="space-y-1.5">
      <label
        className="block text-sm font-medium"
        style={{ color: 'hsl(213,31%,82%)' }}
      >
        {label}
      </label>
      <div className="relative">
        <Icon
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
          style={{ color: 'hsl(213,31%,60%)' }}
        />
        {children}
      </div>
    </div>
  );

  return (
    <div className="dark relative min-h-screen flex items-center justify-center overflow-hidden py-8" style={{ background: 'hsl(222,47%,4%)' }}>
      {/* Star Background */}
      <StarBackground />

      {/* Glow orbs */}
      <div
        className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, hsla(250,65%,65%,0.10) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, hsla(250,65%,65%,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div
          className="rounded-2xl p-8 space-y-6"
          style={{
            background: 'hsla(222,47%,6%,0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid hsla(217,33%,20%,0.8)',
            boxShadow:
              '0 25px 50px -12px rgba(0,0,0,0.6), 0 0 0 1px hsla(250,65%,65%,0.08)',
          }}
        >
          {/* Header */}
          <div className="text-center space-y-2 opacity-0 animate-fade-in">
            <div className="flex justify-center mb-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background:
                    'linear-gradient(135deg, hsl(250,65%,65%) 0%, hsl(250,65%,45%) 100%)',
                  boxShadow: '0 8px 25px hsla(250,65%,65%,0.35)',
                }}
              >
                <UserPlus className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'hsl(213,31%,95%)' }}>
              Create Account
            </h1>
            <p className="text-sm" style={{ color: 'hsl(213,31%,72%)' }}>
              Register to access the admin panel
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm"
              style={{
                background: 'hsla(0,72%,51%,0.12)',
                border: '1px solid hsla(0,72%,51%,0.3)',
                color: 'hsl(0,85%,70%)',
              }}
            >
              <span className="shrink-0">⚠</span>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="opacity-0 animate-fade-in-delay-1">
              <InputWrapper label="Full Name" icon={User}>
                <input
                  id="signup-fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Abdul Kareem"
                  required
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none transition-all duration-300"
                  style={inputBase}
                  onFocus={onFocusInput}
                  onBlur={onBlurInput}
                />
              </InputWrapper>
            </div>

            {/* Email */}
            <div className="opacity-0 animate-fade-in-delay-1">
              <InputWrapper label="Email Address" icon={Mail}>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none transition-all duration-300"
                  style={inputBase}
                  onFocus={onFocusInput}
                  onBlur={onBlurInput}
                />
              </InputWrapper>
            </div>

            {/* Phone */}
            <div className="opacity-0 animate-fade-in-delay-2">
              <InputWrapper label="Phone Number" icon={Phone}>
                <input
                  id="signup-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="10-digit number"
                  required
                  maxLength={10}
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none transition-all duration-300"
                  style={inputBase}
                  onFocus={onFocusInput}
                  onBlur={onBlurInput}
                />
              </InputWrapper>
            </div>

            {/* Password */}
            <div className="opacity-0 animate-fade-in-delay-2">
              <InputWrapper label="Password" icon={Lock}>
                <input
                  id="signup-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Min. 8 characters"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-11 py-2.5 rounded-lg text-sm focus:outline-none transition-all duration-300"
                  style={inputBase}
                  onFocus={onFocusInput}
                  onBlur={onBlurInput}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 rounded transition-colors duration-200"
                  style={{ color: 'hsl(213,31%,55%)' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = 'hsl(250,65%,65%)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'hsl(213,31%,55%)')
                  }
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </InputWrapper>
            </div>

            {/* Confirm Password */}
            <div className="opacity-0 animate-fade-in-delay-3">
              <InputWrapper label="Confirm Password" icon={Lock}>
                <input
                  id="signup-confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Re-enter password"
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-11 py-2.5 rounded-lg text-sm focus:outline-none transition-all duration-300"
                  style={inputBase}
                  onFocus={onFocusInput}
                  onBlur={onBlurInput}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 rounded transition-colors duration-200"
                  style={{ color: 'hsl(213,31%,55%)' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = 'hsl(250,65%,65%)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'hsl(213,31%,55%)')
                  }
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  {showConfirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </InputWrapper>
            </div>

            {/* Role */}
            <div className="space-y-1.5 opacity-0 animate-fade-in-delay-3">
              <label
                className="block text-sm font-medium"
                style={{ color: 'hsl(213,31%,82%)' }}
              >
                Role
              </label>
              <div className="relative">
                <Shield
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: 'hsl(213,31%,55%)' }}
                />
                <select
                  id="signup-role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
                  style={inputBase}
                  onFocus={onFocusInput}
                  onBlur={onBlurInput}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2 opacity-0 animate-fade-in-delay-4">
              <button
                id="signup-submit"
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background:
                    'linear-gradient(135deg, hsl(250,65%,65%) 0%, hsl(250,65%,50%) 100%)',
                  color: 'hsl(213,31%,95%)',
                  boxShadow: loading
                    ? 'none'
                    : '0 4px 20px hsla(250,65%,65%,0.35)',
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow =
                      '0 8px 28px hsla(250,65%,65%,0.45)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow =
                    '0 4px 20px hsla(250,65%,65%,0.35)';
                }}
              >
                {loading ? (
                  <>
                    <span
                      className="w-4 h-4 rounded-full border-2 animate-spin"
                      style={{
                        borderColor: 'rgba(255,255,255,0.3)',
                        borderTopColor: 'white',
                      }}
                    />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Create Account
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer Link */}
          <p
            className="text-center text-sm opacity-0 animate-fade-in-delay-4"
            style={{ color: 'hsl(213,31%,55%)' }}
          >
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium transition-colors duration-200"
              style={{ color: 'hsl(250,65%,65%)' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = 'hsl(250,65%,78%)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'hsl(250,65%,65%)')
              }
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
