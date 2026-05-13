import React from 'react'

function Search({ value, onChange, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form className='search-bar my-8 text-center px-2 xs:mb-10 md:mb-16' onSubmit={handleSubmit}>
      <input
        type="text"
        name='search'
        className="search-box md:w-2/4 sm:p-4 xs:px-2"
        placeholder='Search News Topics...'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button type='submit' className='btn'>Search</button>
    </form>
  )
}

export default Search
