import "./App.css";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import WatchList from "./components/WatchList";
import Banner from "./components/Banner";
import SearchBar from "./components/SearchBar";
import { ThemeProvider } from "./context/ThemeContext";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Provider store={store}>
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
                    <SearchBar />
                    <Movies />
                  </>
                }
              />
              <Route path="/watchlist" element={<WatchList />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
