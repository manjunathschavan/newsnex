import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import EverythingCard from './EverythingCard';
import Loader from './Loader';

function BookmarksPage() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/auth'); return; }
    axios.get('/api/bookmarks', { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => { setBookmarks(data.bookmarks); setLoading(false); })
      .catch(() => setLoading(false));
  }, [user]);

  const removeBookmark = async (id) => {
    try {
      const { data } = await axios.delete(`/api/bookmarks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setBookmarks(data.bookmarks);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loader />;

  return (
    <div style={{ padding: '32px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <p className="section-label" style={{ display: 'block', marginBottom: 8 }}>My Collection</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Saved Articles
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: 6 }}>
          {bookmarks.length} article{bookmarks.length !== 1 ? 's' : ''} saved
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 24px' }}>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔖</div>
          <h3 style={{ fontWeight: 700, marginBottom: 8 }}>No saved articles yet</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Click the bookmark icon on any article to save it here.
          </p>
        </div>
      ) : (
        <div className='cards grid lg:place-content-center md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 gap-6'>
          {bookmarks.map((b) => (
            <div key={b._id}>
              <EverythingCard
                isBookmarked={true}
                onBookmarkClick={() => removeBookmark(b._id)}
                title={b.title}
                description={b.description}
                imgUrl={b.urlToImage}
                publishedAt={b.publishedAt}
                url={b.url}
                author={b.author}
                source={b.source}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookmarksPage;
