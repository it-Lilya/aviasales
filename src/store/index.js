import { configureStore } from "@reduxjs/toolkit";
import sortedReducer from "./sortedReducer";

const store = configureStore({
  reducer: sortedReducer
});

export default store;