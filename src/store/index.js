import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import sortedReducer from "./sortedReducer";
import {thunk} from 'redux-thunk';

const store = configureStore({
  reducer: sortedReducer,
  middlewareApply: applyMiddleware(thunk)
});

export default store;