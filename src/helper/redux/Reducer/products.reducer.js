import { createSlice } from "@reduxjs/toolkit";

const imdbslice = createSlice({
  name: "imdb",
  initialState: {
    isLoggedIn: false,
    producersList: [],
    actorsList: [],
    moviesList: [],
  },
  reducers: {
    // For Login
    updateLoginStatus(state, action) {
      if (!action.payload) {
        delete localStorage["imdb-clone-token"];
        delete localStorage["imdb-clone-email"];
        delete localStorage["imdb-clone-password"];
      }
      state.isLoggedIn = action.payload;
    },
    // For Producers
    setProducers(state, action) {
      state.producersList = action.payload.sort();
    },
    postProducers(state, action) {
      state.producersList = [action.payload, ...state.producersList];
    },
    // For Actors
    setActors(state, action) {
      state.actorsList = action.payload.sort();
    },
    postActors(state, action) {
      state.actorsList = [action.payload, ...state.actorsList];
    },
    // For Movies
    setMovies(state, action) {
      state.moviesList = action.payload;
    },
    updateMovies(state, action) {
      let temp = state.moviesList.filter(
        (ele) => ele._id !== action.payload._id
      );
      state.moviesList = [action.payload, ...temp];
    },
    postMovies(state, action) {
      state.moviesList = [action.payload, ...state.moviesList];
    },
    deleteMovies(state, action) {
      let temp = state.moviesList.filter((ele) => ele._id !== action.payload);
      state.moviesList = temp;
    },
  },
});
export const {
  updateLoginStatus,
  setActors,
  postActors,
  setMovies,
  setProducers,
  postProducers,
  postMovies,
  updateMovies,
  deleteMovies,
} = imdbslice.actions;
export default imdbslice.reducer;
