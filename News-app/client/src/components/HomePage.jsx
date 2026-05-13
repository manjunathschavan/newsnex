import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { icon: "💼", label: "Business", path: "/top-headlines/business", color: "#1a73e8" },
  { icon: "🎬", label: "Entertainment", path: "/top-headlines/entertainment", color: "#9c27b0" },
  { icon: "🏥", label: "Health", path: "/top-headlines/health", color: "#2e7d32" },
  { icon: "🔬", label: "Science", path: "/top-headlines/science", color: "#0097a7" },
  { icon: "⚽", label: "Sports", path: "/top-headlines/sports", color: "#e65100" },
  { icon: "💻", label: "Technology", path: "/top-headlines/technology", color: "#c0392b" },
];

const stats = [
  { val: "54", label: "Countries" },
  { val: "150+", label: "Sources" },
  { val: "24/7", label: "Live Updates" },
  { val: "7", label: "Categories" },
];

function HomePage() {
  return (
    <div style={{ color: "var(--text-primary)" }}>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '0 24px', gap: '28px', background: 'var(--background)',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Background accent */}
        <div style={{
          position: 'absolute', top: '-120px', right: '-120px',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(192,57,43,0.07) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(192,57,43,0.08)', border: '1px solid rgba(192,57,43,0.2)',
          borderRadius: '50px', padding: '6px 16px', fontSize: '0.75rem',
          fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
          color: 'var(--accent)'
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
          Live News Feed
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
          fontWeight: 800, lineHeight: 1.15,
          color: 'var(--text-primary)', maxWidth: 700
        }}>
          The World's News,<br />
          <span style={{ color: 'var(--accent)' }}>All in One Place.</span>
        </h1>

        <p style={{
          fontSize: '1rem', maxWidth: 520, lineHeight: 1.75,
          color: 'var(--text-secondary)', fontWeight: 400
        }}>
          Real-time headlines from 150+ trusted sources across 54 countries — filtered by category, country, and topic.
        </p>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/all-news" style={{
            background: 'var(--accent)', color: '#fff',
            padding: '13px 32px', borderRadius: '7px',
            fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
            transition: 'background 0.2s, transform 0.15s', letterSpacing: '0.3px'
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-hover)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Browse All News →
          </Link>
          <Link to="/top-headlines/general" style={{
            background: 'transparent', color: 'var(--text-primary)',
            padding: '13px 32px', borderRadius: '7px',
            fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none',
            border: '1.5px solid var(--border)', transition: 'border-color 0.2s, transform 0.15s'
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Top Headlines
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
          {stats.map(({ val, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent)', fontFamily: "'Playfair Display', serif" }}>{val}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: 4, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section style={{ padding: '72px 24px', background: 'var(--primary)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p className="section-label" style={{ display: 'block', marginBottom: 10 }}>Explore Topics</p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.9rem', fontWeight: 800,
            color: 'var(--text-primary)', marginBottom: 40
          }}>
            Browse by Category
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 16 }}>
            {categories.map((c, i) => (
              <Link key={i} to={c.path} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 10, padding: '24px 12px', borderRadius: '12px',
                background: 'var(--card-bg)', border: '1px solid var(--border)',
                textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s'
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor = c.color; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <span style={{ fontSize: '1.8rem' }}>{c.icon}</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.3px' }}>{c.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY NEWSNEX ── */}
      <section style={{ padding: '72px 24px', background: 'var(--background)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p className="section-label" style={{ display: 'block', marginBottom: 10 }}>Why NewsNex</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 40 }}>
            News the way it should be
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {[
              { icon: "⚡", title: "Real-Time Updates", desc: "News refreshed continuously from live API sources around the globe." },
              { icon: "🌍", title: "Global Coverage", desc: "Filter by country to get news specific to any region in the world." },
              { icon: "🗂️", title: "Category Filters", desc: "Quickly jump to Business, Sports, Tech, Health and more." },
              { icon: "🌙", title: "Dark Mode", desc: "Easy on the eyes — switch between light and dark themes anytime." },
            ].map((f, i) => (
              <div key={i} style={{
                padding: '24px', borderRadius: '12px',
                background: 'var(--card-bg)', border: '1px solid var(--border)'
              }}>
                <div style={{ fontSize: '1.6rem', marginBottom: 12 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 6, color: 'var(--text-primary)' }}>{f.title}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '72px 24px', background: 'var(--accent)', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: 12 }}>
          Stay informed, every day.
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: 32, fontSize: '0.95rem' }}>
          Real news. No clutter. Just stories that matter.
        </p>
        <Link to="/all-news" style={{
          background: '#fff', color: 'var(--accent)',
          padding: '13px 36px', borderRadius: '7px',
          fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
          display: 'inline-block', transition: 'transform 0.15s'
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Start Reading →
        </Link>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

export default HomePage;
