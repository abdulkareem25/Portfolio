import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { StarBackground } from '../../shared/components/StarBackground';
import { Eye, EyeOff, LogIn, Lock, User } from 'lucide-react';

export const LoginPage = () => {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(credential, password);
      if (result.type === 'auth/login/rejected') {
        setError(result.payload || 'Invalid credentials. Please try again.');
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

  return (
    <div className="dark relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'hsl(222,47%,4%)' }}>
      {/* Star Background */}
      <StarBackground />

      {/* Decorative glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, hsla(250,65%,65%,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, hsla(250,65%,65%,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div
          className="rounded-2xl p-8 space-y-7"
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
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background:
                    'linear-gradient(135deg, hsl(250,65%,65%) 0%, hsl(250,65%,45%) 100%)',
                  boxShadow: '0 8px 25px hsla(250,65%,65%,0.35)',
                }}
              >
                <LogIn className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'hsl(213,31%,95%)' }}>
              Welcome Back
            </h1>
            <p className="text-sm" style={{ color: 'hsl(213,31%,72%)' }}>
              Sign in to access your admin dashboard
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm opacity-0 animate-fade-in"
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
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Credential Field */}
            <div className="space-y-2 opacity-0 animate-fade-in-delay-1">
              <label
                htmlFor="login-credential"
                className="block text-sm font-medium"
                style={{ color: 'hsl(213,31%,75%)' }}
              >
                Email or Phone
              </label>
              <div className="relative">
                <User
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: 'hsl(213,31%,55%)' }}
                />
                <input
                  id="login-credential"
                  name="credential"
                  type="text"
                  autoComplete="username"
                  placeholder="you@example.com or 9876543210"
                  required
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none transition-all duration-300"
                  style={{
                    background: 'hsla(222,47%,11%,0.95)',
                    border: '1px solid hsl(217,33%,28%)',
                    color: 'hsl(213,31%,93%)',
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '1px solid hsl(250,65%,65%)';
                    e.target.style.boxShadow =
                      '0 0 0 3px hsla(250,65%,65%,0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1px solid hsl(217,33%,28%)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2 opacity-0 animate-fade-in-delay-2">
              <label
                htmlFor="login-password"
                className="block text-sm font-medium"
                style={{ color: 'hsl(213,31%,75%)' }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: 'hsl(213,31%,55%)' }}
                />
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-2.5 rounded-lg text-sm focus:outline-none transition-all duration-300"
                  style={{
                    background: 'hsla(222,47%,11%,0.95)',
                    border: '1px solid hsl(217,33%,28%)',
                    color: 'hsl(213,31%,93%)',
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '1px solid hsl(250,65%,65%)';
                    e.target.style.boxShadow =
                      '0 0 0 3px hsla(250,65%,65%,0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1px solid hsl(217,33%,28%)';
                    e.target.style.boxShadow = 'none';
                  }}
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
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2 opacity-0 animate-fade-in-delay-3">
              <button
                id="login-submit"
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
                      className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
                      style={{ borderColor: 'rgba(255,255,255,0.4)', borderTopColor: 'transparent' }}
                    />
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign In
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
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-medium transition-colors duration-200"
              style={{ color: 'hsl(250,65%,65%)' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = 'hsl(250,65%,78%)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'hsl(250,65%,65%)')
              }
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
