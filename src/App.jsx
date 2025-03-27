import "./App.css";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import WatchList from "./components/WatchList";
import Banner from "./components/Banner";
import { ThemeProvider } from "./context/ThemeContext";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  let [watchlist, setWatchList] = useState([]);

  let handleAddToWatchList = (movieObj) => {
    let newWatchList = [...watchlist, movieObj];
    localStorage.setItem("moviesApp", JSON.stringify(newWatchList));
    setWatchList(newWatchList);
    console.log(newWatchList);
  };

  let handleRemoveFromWatchList = (movieObj) => {
    let filteredWatchList = watchlist.filter((movie) => {
      return movie.id != movieObj.id;
    });
    setWatchList(filteredWatchList);
    localStorage.setItem("moviesApp", JSON.stringify(filteredWatchList));
  };

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem("moviesApp");
    if (!moviesFromLocalStorage) {
      return;
    }
    setWatchList(JSON.parse(moviesFromLocalStorage));
  }, []);

  return (
    <ThemeProvider>
      <div
        className="min-h-screen bg-light-background dark:bg-dark-background 
        text-light-text dark:text-dark-text transition-colors duration-300"
      >
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Banner />
                  <Movies
                    handleAddToWatchList={handleAddToWatchList}
                    handleRemoveFromWatchList={handleRemoveFromWatchList}
                    watchlist={watchlist}
                  />
                </>
              }
            />
            <Route
              path="/watchlist"
              element={
                <WatchList
                  watchlist={watchlist}
                  setWatchList={setWatchList}
                  handleRemoveFromWatchList={handleRemoveFromWatchList}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
