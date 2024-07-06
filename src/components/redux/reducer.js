const initialState = {
  data: JSON.parse(localStorage.getItem('tickets'))
};
const sortingReducer = (state = initialState, action) => {
  // switch (action.type) {
  //   case 'SET_SORT_ALL':
  //     return state = JSON.parse(localStorage.getItem('tickets'));
  //   case 'SET_SORT_ONE_TRANSFER':
  //     return {
  //       ...state,
  //       sortDirection: action.payload
  //     };
  //   case 'SET_SORT_TWO_TRANSFERS':
  //     return {
  //       ...state,
  //       sortDirection: action.payload
  //     };
  //   case 'SET_SORT_THREE_TRANSFERS':
  //     return {
  //       ...state,
  //       sortDirection: action.payload
  //     };
  //   default:
  //     return state;
  // }
   switch (action.type) {
    case 'CHEAP':
      return state = JSON.parse(localStorage.getItem('tickets'));
    case 'FAST':
      return {
        ...state,
        sortDirection: action.payload
      };
    case 'OPTIMAL':
      return {
        ...state,
        sortDirection: action.payload
      };
    case 'SET_SORT_THREE_TRANSFERS':
      return {
        ...state,
        sortDirection: action.payload
      };
    default:
      return state;
  }
};

export default sortingReducer;