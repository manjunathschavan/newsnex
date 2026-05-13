import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EverythingCard from './EverythingCard';
import Loader from './Loader';
import countries from './countries';

function CountryNews() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const countryObj = countries.find((c) => c.iso_2_alpha === params.iso);
  const countryName = countryObj ? countryObj.countryName : params.iso;

  function handlePrev() { setPage(page - 1); }
  function handleNext() { setPage(page + 1); }

  const pageSize = 6;

  useEffect(() => { setPage(1); }, [params.iso]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch(`/api/country/${encodeURIComponent(countryName)}?page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('Network response was not ok');
      })
      .then((myJson) => {
        if (myJson.success) {
          setTotalResults(myJson.data.totalResults);
          const articles = myJson.data.articles.filter(
            (a) => a.title && a.title !== '[Removed]' && a.source
          );
          setData(articles);
        } else {
          setError(myJson.message || 'An error occurred');
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setError('Failed to fetch news. Please try again later.');
      })
      .finally(() => setIsLoading(false));
  }, [page, countryName]);

  return (
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mt-6 cards grid lg:place-content-center md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 gap-6 md:px-16 xs:p-4">
        {!isLoading ? (
          data.length > 0 ? (
            data.map((element, index) => (
              <EverythingCard
                key={index}
                title={element.title}
                description={element.description}
                imgUrl={element.urlToImage}
                publishedAt={element.publishedAt}
                url={element.url}
                author={element.author}
                source={element.source.name}
              />
            ))
          ) : (
            <p>No news articles found for this criteria.</p>
          )
        ) : (
          <Loader />
        )}
      </div>
      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button disabled={page <= 1} className="pagination-btn" onClick={handlePrev}>Prev</button>
          <p className="font-semibold opacity-80">{page} of {Math.ceil(totalResults / pageSize)}</p>
          <button disabled={page >= Math.ceil(totalResults / pageSize)} className="pagination-btn" onClick={handleNext}>Next</button>
        </div>
      )}
    </>
  );
}

export default CountryNews;
