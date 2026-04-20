import ArticleCard from './ArticleCard';

const NewsList = ({ articles }) => {
  return (
    <div className="news-grid">
      {articles.map((article, index) => (
        <ArticleCard key={index} article={article} />
      ))}
    </div>
  );
};
