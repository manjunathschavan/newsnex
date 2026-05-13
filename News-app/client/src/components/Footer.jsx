import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{ background: '#0d0d0d', borderTop: '3px solid var(--accent)', padding: '48px 24px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 40 }}>

          {/* Brand */}
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 800, marginBottom: 12 }}>
              <span style={{ color: '#c0392b' }}>News</span><span style={{ color: '#fff' }}>Nex</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#888', lineHeight: 1.7 }}>
              Real-time news from trusted sources worldwide. Stay informed, stay ahead.
            </p>
          </div>

          {/* Categories */}
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#c0392b', marginBottom: 14 }}>Categories</div>
            {['business', 'technology', 'sports', 'health', 'science', 'entertainment'].map(cat => (
              <div key={cat} style={{ marginBottom: 8 }}>
                <Link to={`/top-headlines/${cat}`} style={{ fontSize: '0.82rem', color: '#aaa', textDecoration: 'none', textTransform: 'capitalize', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#aaa'}
                >{cat}</Link>
              </div>
            ))}
          </div>

          {/* Quick links */}
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#c0392b', marginBottom: 14 }}>Quick Links</div>
            {[['Home', '/'], ['All News', '/all-news'], ['Top Headlines', '/top-headlines/general']].map(([label, path]) => (
              <div key={label} style={{ marginBottom: 8 }}>
                <Link to={path} style={{ fontSize: '0.82rem', color: '#aaa', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#aaa'}
                >{label}</Link>
              </div>
            ))}
          </div>

          {/* About */}
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#c0392b', marginBottom: 14 }}>About</div>
            <p style={{ fontSize: '0.8rem', color: '#888', lineHeight: 1.7 }}>
              NewsNex aggregates news from NewsAPI.org — a trusted source powering thousands of news apps worldwide.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #222', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <span style={{ fontSize: '0.75rem', color: '#555' }}>© {new Date().getFullYear()} NewsNex. All rights reserved.</span>
          <span style={{ fontSize: '0.75rem', color: '#555' }}>Powered by NewsAPI.org</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
