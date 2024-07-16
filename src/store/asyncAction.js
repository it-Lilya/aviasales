import {fetchDataAllSuccess, fetchDataSuccess, fetchDataRequest} from './actions';

let arr = [];
let done = false;
export const fetchData = (url) => {
  // ===============================
    // function subscribe() {
    //     fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
    //       .then((res) => {
    //         if (res.status === 500) {
    //           subscribe();
    //           return
    //         } else {
    //           return res.json();
    //         }
    //       })
    //       .then((data) => {
    //         if (data) {
    //           // setFlag(data.stop);
    //           arr.push(data.tickets);
    //           if (!sortTickets) {
    //             setSortTickets(data.tickets.slice(0, 5));
    //           }
    //           if (!data.stop) {
    //             subscribe();
    //           } else {
    //             setTickets(arr.flat());
    //             localStorage.setItem('tickets', JSON.stringify(arr.flat()));
    //           }
    //         }
            
    //       })
    //   }
      // ================================
//          async function subscribe(dispatch) {
//           // console.log(dispatch)
//           try {
//             dispatch({type: 'FETCH_DATA_REQUEST'});
//             await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${JSON.parse(localStorage.getItem('id'))}`)
//               .then((res) => {
//                 if (res.status === 500) {
//                   console.log(res.status)
//                   subscribe();
//                   return;
//                 } else {
//                   return res.json();
//                 }
//                 // return res.json();
//               })
//               .then((data) => {
//                 if (data) {
//                   // arr.push(data.tickets);
//                   dispatch({ type: 'ADD_TICKETS', payload: data});
//                   // localStorage.setItem('tickets', JSON.stringify(data.tickets.slice(0, 5)));
//                 }
//               })
//               .catch((err) => {
//                 subscribe();
//                 // dispatch({ type: 'FETCH_DATA_FAILURE', payload: err})
//           })
//           } catch (error) {
//             // subscribe();
//             return dispatch({ type: 'FETCH_DATA_FAILURE', payload: error });
//           }
//         };
//   async function fetchData(url) {
//   const response = await fetch(url);
//   const reader = response.body.getReader();
//   const decoder = new TextDecoder();
//   let result = '';
//   let done = false;

//   while (!done) {
//     const { value, done: doneReading } = await reader.read();
//     done = doneReading;
//     result += decoder.decode(value, { stream: true });

//     // Обработка частично загруженных данных
//     processPartialData(result);
//   }

//   // Обработка полностью загруженных данных
//   processCompleteData(result);
// }

// function processPartialData(data, dispatch) {
//   // Логика обработки частично загруженных данных
//   console.log('Частично загруженные данные:', data);
//   dispatch({type: 'FETCH_DATA_REQUEST'})
// }

// function processCompleteData(data) {
//   // Логика обработки полностью загруженных данных
//   console.log('Полностью загруженные данные:', data);
// }
// export const fetchData = (url) => {
  return async function func(dispatch)  {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      if (response.status === 500) {
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
          dispatch(fetchDataAllSuccess(arr.flat())) // ({type: 'FETCH_DATA_ALL_SUCCESS', payload: arr.flat()});
        }
      }
    } catch (error) {
      console.log(error)
      if (error.message.includes('500')) {
        // console.log('Произошла ошибка на сервере (500):', error);
        // dispatch(fetchDataFailure(error));
        handleServerError(error);
        return func(dispatch);
      } else {
        // console.log('Произошла ошибка:', error);
        // dispatch(fetchDataFailure(error));
        // handleOtherError(error);
        // f()
        return func(dispatch);
      }
    }
  };
};

function handleServerError(error) {
  // Логика обработки ошибки 500
  console.log('Обработка ошибки 500:', error);
}

// function handleOtherError(error) {
//   // Логика обработки других ошибок
//   console.log('Обработка других ошибок:', error);
// }

// Вызов функции с URL
// return fetchData(`https://aviasales-test-api.kata.academy/tickets?searchId=${JSON.parse(localStorage.getItem('id'))}`);
// }