import { configureStore } from "@reduxjs/toolkit";
import imdbslice from "./Reducer/products.reducer";

const store = configureStore({
  reducer: {
    imdbReducer: imdbslice,
  },
});
export default store;
