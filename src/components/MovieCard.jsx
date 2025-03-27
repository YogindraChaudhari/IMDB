import React, { useState } from "react";
import { Heart, XCircle } from "lucide-react";

function MovieCard({
  movieObj,
  poster_path,
  name,
  handleAddToWatchList,
  handleRemoveFromWatchList,
  watchlist,
}) {
  const [isHovered, setIsHovered] = useState(false);

  function doesContain(movieObj) {
    return watchlist.some((movie) => movie.id === movieObj.id);
  }

  const isInWatchlist = doesContain(movieObj);

  return (
    <div
      className="relative h-[45vh] w-[30vh] 
        bg-cover bg-center 
        rounded-2xl 
        overflow-hidden 
        shadow-lg 
        transform transition-all duration-300 
        hover:scale-105 
        hover:shadow-xl 
        group"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Movie Title */}
      <div
        className="absolute top-0 w-full 
        bg-gray-600/80 dark:bg-gray-900/80 
        text-white 
        text-center 
        p-2 
        truncate"
      >
        {name}
      </div>

      {/* Watchlist Toggle Button */}
      <div
        onClick={() =>
          isInWatchlist
            ? handleRemoveFromWatchList(movieObj)
            : handleAddToWatchList(movieObj)
        }
        className={`absolute top-2 right-2 
          p-2 
          rounded-full 
          transition-all duration-300 
          ${isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
          ${
            isInWatchlist
              ? "bg-red-500/80 hover:bg-red-600"
              : "bg-green-500/80 hover:bg-green-600"
          }
          text-white 
          cursor-pointer 
          hover:scale-110`}
        title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      >
        {isInWatchlist ? (
          <XCircle className="h-6 w-6" />
        ) : (
          <Heart className="h-6 w-6" />
        )}
      </div>

      {/* Additional Movie Info Overlay */}
      {isHovered && (
        <div
          className="absolute bottom-0 w-full 
          bg-black/70 
          text-white 
          p-2 
          text-center 
          transition-all duration-300"
        >
          <div className="flex justify-between px-2">
            <span>Rating: {movieObj.vote_average.toFixed(1)}</span>
            <span>Popularity: {movieObj.popularity.toFixed(1)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieCard;
