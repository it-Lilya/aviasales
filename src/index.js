import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/App/App';
import './index.scss';

import { configureStore } from '@reduxjs/toolkit';
import reducer from './components/redux/reducer';
import { Provider } from 'react-redux';
// import { store } from './components/redux/store';

const store = configureStore({ reducer });

// export default rootReducer;

const root = createRoot(document.getElementById('root'));
const update = () => {
  root.render(<Provider store={store}><App /></Provider>);
}

update();
store.subscribe(update);