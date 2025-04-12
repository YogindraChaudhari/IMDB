import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import {
  fetchPopularMovies,
  setCurrentPage,
} from "../store/slices/moviesSlice";
import LoadingSpinner from "./LoadingSpinner";

function Movies() {
  const dispatch = useDispatch();
  const {
    list: movies,
    status,
    currentPage,
    searchQuery,
  } = useSelector((state) => state.movies);

  const handlePrevious = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      dispatch(setCurrentPage(newPage));
      if (searchQuery) {
        dispatch(searchMovies(searchQuery, newPage));
      } else {
        dispatch(fetchPopularMovies(newPage));
      }
    }
  };

  const handleNext = () => {
    const newPage = currentPage + 1;
    dispatch(setCurrentPage(newPage));
    if (searchQuery) {
      dispatch(searchMovies(searchQuery, newPage));
    } else {
      dispatch(fetchPopularMovies(newPage));
    }
  };

  useEffect(() => {
    if (!searchQuery) {
      dispatch(fetchPopularMovies(currentPage));
    }
  }, [dispatch, currentPage, searchQuery]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "failed") {
    return (
      <div className="text-center p-8 text-red-500">
        Failed to load movies. Please try again.
      </div>
    );
  }

  if (movies.length === 0 && status === "succeeded") {
    return (
      <div className="text-center p-8">
        No movies found. Try a different search.
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="text-2xl m-5 font-bold text-center">
        {searchQuery
          ? `SEARCH RESULTS FOR "${searchQuery.toUpperCase()}"`
          : "TRENDING MOVIES"}
      </div>

      <div className="flex flex-row flex-wrap justify-around gap-12">
        {movies.map((movieObj) => (
          <MovieCard
            key={movieObj.id}
            movieObj={movieObj}
            poster_path={movieObj.poster_path}
            name={movieObj.original_title || movieObj.title}
          />
        ))}
      </div>
      <Pagination
        pageNo={currentPage}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
    </div>
  );
}

export default Movies;
