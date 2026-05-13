import React from 'react';

function Loader() {
  return (
    <div className="loader-container w-full flex justify-center items-center" style={{ minHeight: '50vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="loader" style={{ margin: '0 auto 16px' }}></div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: '0.5px' }}>
          Loading latest news...
        </p>
      </div>
    </div>
  );
}

export default Loader;
