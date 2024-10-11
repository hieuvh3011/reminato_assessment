// src/redux/slices/movieSlice.js
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {setLoading} from '@app/redux/app/app_slice';
import Movie from '@app/entities/movie';
import {
  getAllMovies,
  updateMovie,
} from '@app/services/movie_service';

interface MovieState {
  movies: Movie[];
  favorites: Movie[];
  booked: Movie[];
  selectedMovie: Movie | null;
}

const initialState: MovieState = {
  movies: [],
  favorites: [],
  booked: [],
  selectedMovie: null,
};

const getListFavorite = (listMovies: Movie[]) => {
  return listMovies.filter(item => item.isLiked);
};

const getListBooked = (listMovies: Movie[]) => {
  return listMovies.filter(item => item.isBooked);
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, {dispatch}) => {
    dispatch(setLoading(true));
    const movies = await getAllMovies();
    const favorites = getListFavorite(movies);
    const booked = getListBooked(movies);
    dispatch(setLoading(false));
    return {movies, favorites, booked};
  },
);

export const likeMovie = createAsyncThunk(
  'movies/likeMovie',
  async (movieId: number) => {
    const likedMovie = initialState.movies.find(item => item.id === movieId);
    if (likedMovie) {
      likedMovie.isLiked = true;
    }
    return {updateMovie: likedMovie};
  },
);

export const unlikeMovie = createAsyncThunk(
  'movies/unlikeMovie',
  async (movieId: number) => {
    const likedMovie = initialState.movies.find(item => item.id === movieId);
    if (likedMovie) {
      likedMovie.isLiked = false;
    }
    return {updateMovie: likedMovie};
  },
);

export const bookMovie = createAsyncThunk(
  'movies/bookMovie',
  async (movieId: number, {dispatch}) => {
    dispatch(setLoading(true));
    const updatedMovies = await updateMovie(movieId, {
      isBooked: true,
    });
    const movies = await getAllMovies();
    const favorites = getListFavorite(movies);
    const booked = getListBooked(movies);
    dispatch(setLoading(false));
    return {updatedMovies, favorites, booked};
  },
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    selectMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload.movies;
        state.favorites = action.payload.favorites;
        state.booked = action.payload.booked;
      })
      .addCase(likeMovie.fulfilled, (state, action) => {
        Object.assign(state.favorites, action.payload.updateMovie);
      })
      .addCase(unlikeMovie.fulfilled, (state, action) => {
        Object.assign(state.favorites, action.payload.updateMovie);
      })
      .addCase(bookMovie.fulfilled, (state, action) => {
        state.movies = action.payload.updatedMovies;
        state.favorites = action.payload.favorites;
        state.booked = action.payload.booked;
      });
  },
});

export const {selectMovie} = movieSlice.actions;
export default movieSlice.reducer;
