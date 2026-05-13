import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const endpoint = isLogin ? `${import.meta.env.VITE_API_URL}/auth/login` : `${import.meta.env.VITE_API_URL}/auth/register`;
      const payload = isLogin ? { email: form.email, password: form.password } : form;
      const { data } = await axios.post(endpoint, payload);
      if (data.success) {
        login(data.user, data.token);
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '12px 14px', borderRadius: '7px',
    border: '1.5px solid var(--border)', background: 'var(--primary)',
    fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.2s',
    color: 'var(--text-primary)'
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: 420, background: 'var(--card-bg)', borderRadius: '14px', border: '1px solid var(--border)', padding: '40px 36px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 800, marginBottom: 6 }}>
            <span style={{ color: 'var(--accent)' }}>News</span><span>Nex</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {isLogin ? 'Sign in to save your favourite articles' : 'Create an account to get started'}
          </p>
        </div>

        {/* Toggle */}
        <div style={{ display: 'flex', background: 'var(--primary)', borderRadius: '8px', padding: 4, marginBottom: 24 }}>
          {['Login', 'Register'].map((tab) => (
            <button key={tab} onClick={() => { setIsLogin(tab === 'Login'); setError(''); }}
              style={{
                flex: 1, padding: '9px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.2s',
                background: (isLogin && tab === 'Login') || (!isLogin && tab === 'Register') ? 'var(--card-bg)' : 'transparent',
                color: (isLogin && tab === 'Login') || (!isLogin && tab === 'Register') ? 'var(--accent)' : 'var(--text-secondary)',
                boxShadow: (isLogin && tab === 'Login') || (!isLogin && tab === 'Register') ? '0 1px 4px rgba(0,0,0,0.1)' : 'none'
              }}
            >{tab}</button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {!isLogin && (
            <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          )}
          <input name="email" type="email" placeholder="Email address" value={form.email} onChange={handleChange} required style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />

          {error && <p style={{ color: '#e74c3c', fontSize: '0.82rem', textAlign: 'center' }}>{error}</p>}

          <button type="submit" disabled={loading} style={{
            background: 'var(--accent)', color: '#fff', padding: '13px',
            borderRadius: '7px', border: 'none', fontWeight: 700, fontSize: '0.9rem',
            cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
            transition: 'background 0.2s', marginTop: 4
          }}>
            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 20 }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => { setIsLogin(!isLogin); setError(''); }}
            style={{ color: 'var(--accent)', fontWeight: 600, cursor: 'pointer' }}>
            {isLogin ? 'Register' : 'Sign In'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
