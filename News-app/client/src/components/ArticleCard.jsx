import React from 'react';

const ArticleCard = ({ article }) => {
  return (
    <a 
      href={article.url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="article-card"
      style={{
        textDecoration: 'none',
        color: 'inherit',
        cursor: 'pointer'
      }}
    >
      <div className="card">
        <img 
          src={article.urlToImage || 'default-image-url.jpg'} 
          alt={article.title}
          className="card-img"
        />
        <div className="card-content">
          <h3 className="card-title">{article.title}</h3>
          <p className="card-description">{article.description}</p>
          <div className="card-meta">
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
            <span>{article.source.name}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ArticleCard;
