// src/redux/slices/movieSlice.js
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {setLoading} from '@app/redux/app/app_slice';
import Movie from '@app/entities/movie';
import {
  getAllMovies,
  initializeMockData,
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
    await initializeMockData();
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
    const updatedMovie = await updateMovie(movieId, {isLiked: true});
    return updatedMovie;
  },
);

export const unlikeMovie = createAsyncThunk(
  'movies/unlikeMovie',
  async (movieId: number) => {
    const updatedMovie = await updateMovie(movieId, {isLiked: false});
    return updatedMovie;
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
    const booked = getListBooked(movies);
    dispatch(setLoading(false));
    return {updatedMovies, booked};
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
        const updatedMovie = action.payload;
        if (updatedMovie !== null) {
          state.movies = state.movies.map(movie =>
            movie.id === updatedMovie.id ? updatedMovie : movie,
          );

          if (!state.favorites.some(movie => movie.id === updatedMovie.id)) {
            state.favorites.push(updatedMovie);
          }
        }
      })
      .addCase(unlikeMovie.fulfilled, (state, action) => {
        const updatedMovie = action.payload;
        if (updatedMovie !== null) {
          state.movies = state.movies.map(movie =>
            movie.id === updatedMovie.id ? updatedMovie : movie,
          );

          state.favorites = state.favorites.filter(
            movie => movie.id !== updatedMovie.id,
          );
        }
      })
      .addCase(bookMovie.fulfilled, (state, action) => {
        state.booked = action.payload.booked;
      });
  },
});

export const {selectMovie} = movieSlice.actions;
export default movieSlice.reducer;
