import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_REACT_APP_TMDB_API_KEY;

export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopular",
  async (pageNo = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${pageNo}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchMovies = createAsyncThunk(
  "movies/search",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=1`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    list: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    currentPage: 1,
    totalPages: 0,
    searchQuery: "",
    PopularMovies: [],
    searchResults: [],
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchQuery = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.results;
        state.totalPages = action.payload.total_pages;
        state.currentPage = action.payload.page;
        state.PopularMovies = action.payload.results;
        state.searchQuery = action.payload.query || "";
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      })
      .addCase(searchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.results;
        state.totalPages = action.payload.total_pages;
        state.currentPage = action.payload.page;
        state.searchQuery = action.meta.arg;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { setCurrentPage, clearSearchResults } = moviesSlice.actions;
export default moviesSlice.reducer;
