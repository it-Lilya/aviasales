import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

import sortedReducer from './sortedReducer';

const store = configureStore({
  reducer: sortedReducer,
  middlewareApply: applyMiddleware(thunk),
});

export default store;
