import React, { useState } from "react";
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const fallbackImg = "https://placehold.co/600x300/1a1a1a/555?text=No+Image+Available";

function EverythingCard(props) {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(props.isBookmarked || false);
  const [saving, setSaving] = useState(false);

  const date = props.publishedAt
    ? new Date(props.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    : "Unknown date";

  const timeAgo = props.publishedAt
    ? (() => {
        const diff = Math.floor((Date.now() - new Date(props.publishedAt)) / 60000);
        if (diff < 60) return `${diff}m ago`;
        if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
        return date;
      })()
    : date;

  const handleBookmark = async () => {
    if (props.onBookmarkClick) { props.onBookmarkClick(); return; }
    if (!user) { navigate('/auth'); return; }
    setSaving(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/bookmarks`, {
        title: props.title, description: props.description,
        url: props.url, urlToImage: props.imgUrl,
        publishedAt: props.publishedAt, author: props.author,
        source: props.source
      }, { headers: { Authorization: `Bearer ${token}` } });
      setBookmarked(true);
    } catch {
      setBookmarked(true); // already bookmarked
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="everything-card">
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
        <img
          src={props.imgUrl || fallbackImg}
          alt={props.title}
          onError={(e) => { e.target.src = fallbackImg; }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        {/* Source badge */}
        {props.source && (
          <span style={{
            position: 'absolute', bottom: 10, left: 10,
            background: 'rgba(0,0,0,0.72)', color: '#fff',
            fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.5px',
            padding: '3px 8px', borderRadius: '4px', backdropFilter: 'blur(4px)'
          }}>
            {props.source.substring(0, 30)}
          </span>
        )}
        {/* Bookmark button */}
        <button onClick={handleBookmark} disabled={saving || (bookmarked && !props.onBookmarkClick)} title={bookmarked ? 'Remove' : 'Save article'} style={{
          position: 'absolute', top: 10, right: 10,
          background: bookmarked ? 'var(--accent)' : 'rgba(0,0,0,0.6)',
          color: '#fff', border: 'none', borderRadius: '6px',
          width: 34, height: 34, cursor: props.onBookmarkClick || !bookmarked ? 'pointer' : 'default',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem', backdropFilter: 'blur(4px)', transition: 'background 0.2s'
        }}>
          {saving ? '⏳' : bookmarked ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          )}
        </button>
      </div>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '16px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="card-category-badge">Latest</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{timeAgo}</span>
        </div>

        <h2 className="title" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {props.title}
        </h2>

        <p style={{
          fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--text-secondary)',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1
        }}>
          {props.description || "Click to read the full story."}
        </p>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', overflow: 'hidden' }}>
            {props.author && (
              <span style={{ fontWeight: 600, color: 'var(--text-primary)', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 180 }}>
                {props.author.substring(0, 40)}
              </span>
            )}
            <span>{date}</span>
          </div>
          <a href={props.url} target="_blank" rel="noreferrer" style={{
            background: 'var(--accent)', color: '#fff',
            fontSize: '0.75rem', fontWeight: 700, padding: '7px 14px',
            borderRadius: '5px', textDecoration: 'none', whiteSpace: 'nowrap',
            transition: 'background 0.2s', letterSpacing: '0.3px', flexShrink: 0
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-hover)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
          >
            Read More →
          </a>
        </div>
      </div>
    </div>
  );
}

export default EverythingCard;
