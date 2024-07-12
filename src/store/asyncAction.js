// let arr = [];
export const fetchData = () => {
  // ===============================
    // function subscribe() {
      //   fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
      //     .then((res) => {
      //       if (res.status === 500) {
      //         subscribe();
      //         return
      //       } else {
      //         return res.json();
      //       }
      //     })
      //     .then((data) => {
      //       if (data) {
      //         setFlag(data.stop);
      //         arr.push(data.tickets);
      //         if (!sortTickets) {
      //           setSortTickets(data.tickets.slice(0, 5));
      //         }
      //         if (!data.stop) {
      //           subscribe();
      //         } else {
      //           setTickets(arr.flat());
      //           localStorage.setItem('tickets', JSON.stringify(arr.flat()));
      //         }
      //       }
            
      //     })
      // }
      // ================================
        return async function subscribe (dispatch) {
          dispatch({type: 'FETCH_DATA_REQUEST'});
          try {
            await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${JSON.parse(localStorage.getItem('id'))}`)
              .then((res) => {
                if (res.status === 500) {
                  subscribe();
                  return;
                } else {
                  return res.json();
                }
                // return res.json();
              })
              .then((data) => {
                if (data) {
                  // arr.push(data.tickets);
              
                  dispatch({ type: 'ADD_TICKETS', payload: data});
                  // localStorage.setItem('tickets', JSON.stringify(data.tickets.slice(0, 5)));
                }
              })
              .catch((err) =>  dispatch({ type: 'FETCH_DATA_FAILURE', payload: 'error '}))
          } catch (error) {
            // return dispatch({ type: 'FETCH_DATA_FAILURE', payload: error });
          }
        };

}