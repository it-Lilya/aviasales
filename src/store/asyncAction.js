import { fetchDataAllSuccess, fetchDataSuccess, fetchDataFailure } from './actions';

let arr = [];
let done = false;
export const fetchData = (url) => {
  return async function func(dispatch) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        // console.log(response.status);
        dispatch(fetchDataFailure(response.status));
        throw new Error(`Ошибка: ${response.status}`);
      }
      const res = await response.json();
      if (res.stop === false) {
        if (!done) {
          done = true;
          localStorage.setItem('tickets', JSON.stringify(res.tickets.flat()));
          dispatch(fetchDataSuccess(res.tickets.flat()));
        }
        arr.push(res.tickets);
        return func(dispatch);
      } else {
        if (Array.isArray(arr) && arr.every(Array.isArray)) {
          localStorage.setItem('tickets', JSON.stringify(arr.flat()));
          dispatch(fetchDataAllSuccess(arr.flat()));
        }
      }
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
      return func(dispatch);
      // if (error.message.includes('500')) {
      //   dispatch(fetchDataFailure(error.message));
      //   return func(dispatch);
      // } else {
      //   return func(dispatch);
      // }
    }
  };
};
