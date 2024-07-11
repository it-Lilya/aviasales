import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/App/App';
import './index.scss';

// import { configureStore } from '@reduxjs/toolkit';
// import reducer from './components/redux/reducer';
import { Provider } from 'react-redux';
import store from './store/index'
// import { thunk } from 'redux-thunk';
// import { store } from './components/redux/store';
// function Midl(store) {
//   return function(next) {
//     return function(action) {
//       const result = next(action);
//       // console.log(result)
//       console.log(store.getState())
//       return result
//     }
//   }
// }

// const store = configureStore({ reducer:reducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(Midl, thunk) });
// const store = configureStore({
//   reducer:reducer,
//   // middleware: (getDefaultMiddleware) => {
//   //   return getDefaultMiddleware().concat(thunk)
//   // }
// });
// const store = configureStore({reducer});
// export default rootReducer;

// const root = createRoot(document.getElementById('root'));
// const update = () => {
//   root.render(<Provider store={store}><App /></Provider>);
// }

// update();
// store.subscribe(update);
const root = createRoot(document.getElementById('root'));
root.render(<Provider store={store}><App /></Provider>);