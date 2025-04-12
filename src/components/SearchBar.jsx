import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchMovies,
  fetchPopularMovies,
  clearSearchResults,
} from "../store/slices/moviesSlice";
import { Search, X } from "lucide-react";

function SearchBar() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state) => state.movies);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(searchMovies(query));
    }
  };

  const clearSearch = () => {
    setQuery("");
    dispatch(clearSearchResults());
    dispatch(fetchPopularMovies(1));
  };

  return (
    <div className="max-w-md mx-auto my-6 px-4">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-md overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
            className="w-full py-3 px-5 outline-none dark:bg-gray-800 dark:text-white"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={20} />
            </button>
          )}
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-black p-3 px-4 transition-colors"
          >
            <Search size={20} />
          </button>
        </div>
      </form>
      {searchQuery && (
        <div className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Showing results for: <span className="font-bold">{searchQuery}</span>
          <button
            onClick={clearSearch}
            className="ml-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
