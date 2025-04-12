import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchMovies,
  fetchPopularMovies,
  clearSearchResults,
} from "../store/slices/moviesSlice";
import { Search, X, Flame } from "lucide-react";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch();
  const { searchQuery, PopularMovies } = useSelector((state) => state.movies);

  useEffect(() => {
    if (PopularMovies.length === 0) {
      dispatch(fetchPopularMovies(1));
    }
  }, [dispatch, PopularMovies]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(searchMovies(query));
      setIsFocused(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    dispatch(clearSearchResults());
    dispatch(fetchPopularMovies(1));
  };

  const getFilteredSuggestions = () => {
    const lowerQuery = query.toLowerCase().trim();

    if (!lowerQuery) return PopularMovies.slice(0, 5);

    return PopularMovies.filter((movie) =>
      movie.title.toLowerCase().startsWith(lowerQuery)
    ).slice(0, 5);
  };

  const handleSuggestionClick = (title) => {
    setQuery(title);
    dispatch(searchMovies(title));
    setIsFocused(false);
  };

  const suggestions = getFilteredSuggestions();

  return (
    <div className="max-w-md mx-auto my-6 px-4 relative">
      <form onSubmit={handleSearch} className="relative z-20">
        <div className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-md overflow-hidden">
          <input
            type="text"
            value={query}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
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
      {/* Suggestions Dropdown */}
      {isFocused && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-2 z-10 bg-white dark:bg-gray-700 shadow-lg rounded-md overflow-hidden">
          {suggestions.map((movie) => (
            <li
              key={movie.id}
              onClick={() => handleSuggestionClick(movie.title)}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              {!query && <Flame className="text-yellow-500 mr-2" size={16} />}
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {movie.title}
              </span>
            </li>
          ))}
        </ul>
      )}
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
