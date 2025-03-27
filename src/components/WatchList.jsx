import React, { useEffect, useState } from "react";
import genreids from "../utils/genre";
import { Filter, ChevronUp, ChevronDown } from "lucide-react";

function WatchList({ watchlist, setWatchList, handleRemoveFromWatchList }) {
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(["All Genres"]);
  const [currGenre, setCurrGenre] = useState("All Genres");
  const [isGenreMenuOpen, setIsGenreMenuOpen] = useState(false);

  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let handleFilter = (genre) => {
    setCurrGenre(genre);
  };

  let sortIncreasing = () => {
    let sortedIncreasing = watchlist.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setWatchList([...sortedIncreasing]);
  };

  let sortDecreasing = () => {
    let sortedDecreasing = watchlist.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setWatchList([...sortedDecreasing]);
  };

  let sortPopHigh = () => {
    let highPop = watchlist.sort((movieA, movieB) => {
      return movieB.popularity - movieA.popularity;
    });
    setWatchList([...highPop]);
  };

  let sortPopLow = () => {
    let lowPop = watchlist.sort((movieA, movieB) => {
      return movieA.popularity - movieB.popularity;
    });
    setWatchList([...lowPop]);
  };

  useEffect(() => {
    let temp = watchlist.map((movieObj) => {
      return genreids[movieObj.genre_ids[0]];
    });
    temp = new Set(temp);
    setGenreList(["All Genres", ...temp]);
  }, [watchlist]);

  return (
    <div className="container mx-auto px-4 dark:bg-dark-background dark:text-dark-text transition-colors">
      {/* Genre Filter with Responsive Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsGenreMenuOpen(!isGenreMenuOpen)}
          className="flex items-center justify-between w-full p-3 
            bg-gray-100 dark:bg-gray-800 rounded-lg 
            text-gray-700 dark:text-gray-200 mb-4"
        >
          <span className="flex items-center">
            <Filter className="mr-2" />
            {currGenre}
          </span>
          <ChevronUp
            className={`transform transition-transform ${
              isGenreMenuOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isGenreMenuOpen && (
          <div
            className="absolute z-10 w-full 
            bg-white dark:bg-gray-700 
            shadow-lg rounded-lg max-h-60 overflow-y-auto"
          >
            {genreList.map((genre) => (
              <div
                key={genre}
                onClick={() => {
                  handleFilter(genre);
                  setIsGenreMenuOpen(false);
                }}
                className={`p-3 cursor-pointer 
                  ${
                    currGenre === genre
                      ? "bg-blue-500 text-white dark:bg-blue-600"
                      : "hover:bg-gray-100 dark:hover:bg-gray-600"
                  }
                  transition-colors`}
              >
                {genre}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Responsive Search Input */}
      <div className="mb-4">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="Search Movies"
          className="w-full p-3 
            bg-gray-100 dark:bg-gray-800 
            text-gray-700 dark:text-gray-200 
            rounded-lg outline-none 
            focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-center">
          {/* Table headers with sorting icons */}
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3 flex justify-center items-center">
                <ChevronUp
                  onClick={sortIncreasing}
                  className="cursor-pointer hover:text-blue-500"
                />
                Ratings
                <ChevronDown
                  onClick={sortDecreasing}
                  className="cursor-pointer hover:text-blue-500"
                />
              </th>
              <th className="p-3">
                <div className="flex justify-center items-center">
                  <ChevronUp
                    onClick={sortPopHigh}
                    className="cursor-pointer hover:text-blue-500"
                  />
                  Popularity
                  <ChevronDown
                    onClick={sortPopLow}
                    className="cursor-pointer hover:text-blue-500"
                  />
                </div>
              </th>
              <th className="p-3">Genre</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {watchlist
              .filter(
                (movieObj) =>
                  currGenre === "All Genres" ||
                  genreids[movieObj.genre_ids[0]] === currGenre
              )
              .filter((movieObj) =>
                movieObj.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((movieObj) => (
                <tr
                  key={movieObj.id}
                  className="border-b dark:border-gray-700 
                    hover:bg-gray-50 dark:hover:bg-gray-800 
                    transition-colors"
                >
                  {/* Movie details */}
                  <td className="p-3 flex items-center">
                    <img
                      className="h-24 w-16 object-cover mr-4 rounded"
                      src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                      alt={movieObj.title}
                    />
                    <span className="font-semibold dark:text-gray-200">
                      {movieObj.title}
                    </span>
                  </td>
                  <td className="p-3">{movieObj.vote_average}</td>
                  <td className="p-3">{movieObj.popularity}</td>
                  <td className="p-3">{genreids[movieObj.genre_ids[0]]}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleRemoveFromWatchList(movieObj)}
                      className="bg-red-500 text-white px-3 py-1 
                        rounded hover:bg-red-600 
                        dark:bg-red-700 dark:hover:bg-red-600 
                        transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WatchList;
