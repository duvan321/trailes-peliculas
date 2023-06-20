import React from "react";

function SearchBar({ searchKey, setSearchKey, searchMovies }) {
  return (
    <form className="container mb-4" onSubmit={searchMovies}>
      <input
        className="border border-success text-success"
        type="text"
        placeholder="search"
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <button className="btn btn-success">Search</button>
    </form>
  );
}

export default SearchBar;
