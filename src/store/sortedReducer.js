const initialState = {
  tickets: [],
  sorted: 'cheap',
  filters: ['all'],
  limit: 5,
  allTickets: [],
  activeLimit: 5,
  isLoading: true
};

const sortPrice = (arr, limit, all, prevLimit) => {
  if (limit !== prevLimit) {
    // localStorage.setItem('tickets', JSON.stringify(all.slice(0, limit)));
    return all.slice(0, limit).sort((a, b) => a.price - b.price);
  }
  // localStorage.setItem('tickets', JSON.stringify(arr.slice(0, limit)));
  return arr.slice(0, limit).sort((a, b) => a.price - b.price);
};

const sortDuration = (arr, limit, all, prevLimit) => {
  if (limit !== prevLimit) {
    // localStorage.setItem('tickets', JSON.stringify(all.slice(0, limit)));
    return all.slice(0, limit).sort((a, b) => a.segments[0].duration - b.segments[0].duration);
  }
  // localStorage.setItem('tickets', JSON.stringify(arr.slice(0, limit)));
  return arr.slice(0, limit).sort((a, b) => a.segments[0].duration - b.segments[0].duration);
};

const sortOptimal = (arr, limit, all, prevLimit) => {
  if (limit !== prevLimit) {
    // localStorage.setItem('tickets', JSON.stringify(all.slice(0, limit)));
    return all.slice(0, limit).sort((a, b) => a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration));
  }
  // localStorage.setItem('tickets', JSON.stringify(arr.slice(0, limit)));
  return arr.slice(0, limit).sort((a, b) => a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration));
};

const filtration = (arr, num) => {
  return arr.filter((el) => el.segments[0].stops.length === num);
};

const tt = (el, arr) => {
  if (el === 'one_transfers') {
    return filtration(arr, 1);
  } else if (el === 'two_transfers') {
    return filtration(arr, 2);
  } else if (el === 'third_transfers') {
    return filtration(arr, 3);
  }
};

const filerSort = (arr, state, action) => {
  if (state.sorted === 'cheap') {
    arr = sortPrice(action.payload, action.limit, state.allTickets, state.limit);
  } else if (state.sorted === 'fast') {
    arr = sortDuration(action.payload, action.limit, state.allTickets, state.limit);
  } else if (state.sorted === 'optimal') {
    arr = sortOptimal(action.payload, action.limit, state.allTickets, state.limit);
  }
  return arr;
};
const toggleTicket = (tickets, elem) => {
  let newArr = [];
  if (elem === 'one_transfers') {
    newArr.push(tickets.filter(t => t.segments[0].stops.length !== 1));
  } else if (elem === 'two_transfers') {
    newArr.push(tickets.filter(t => t.segments[0].stops.length !== 2));
  } else if (elem === 'third_transfers') {
    newArr.push(tickets.filter(t => t.segments[0].stops.length !== 3));
  }
  return newArr[0];
};
const removeDuplicates = (arr) => {
  const uniqueTickets = [];
  const ticketSet = new Set();

  arr.forEach(ticket => {
    const ticketString = JSON.stringify(ticket);
    if (!ticketSet.has(ticketString)) {
      ticketSet.add(ticketString);
      uniqueTickets.push(ticket);
    }
  });

  return uniqueTickets;
};

const sortedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHEAP':
      let array = [];
      if (state.filters.length === 0) {
        array = [];
      } else if (state.filters.length > 0 && state.filters[0] !== 'all') {
        state.filters.forEach((el) => {
          array.push(tt(el, sortPrice([...state.tickets], action.limit, state.allTickets, state.limit)));
        });
      } else {
        array = sortPrice([...state.tickets], action.limit, state.allTickets, state.limit);
      }
      if (array.length) {
        return {
          ...state,
          tickets: array.flat(),
          sorted: 'cheap'
        };
      } else {
        return {
          ...state,
          tickets: [],
          sorted: 'cheap'
        };
      }
      
    case 'FAST':
      let arr = [];
      if (state.filters.length === 0) {
        arr = [];
      } else if (state.filters.length > 0 && state.filters[0] !== 'all') {
        state.filters.forEach((el) => {
          arr.push(tt(el, sortDuration([...state.tickets], action.limit, state.allTickets, state.limit)));
        });
      } else {
        arr = sortDuration([...state.tickets], action.limit, state.allTickets, state.limit);
      }
      return {
        ...state,
        tickets: arr.flat(),
        sorted: 'fast'
      };
    case 'OPTIMAL':
      let arrays = [];
      if (state.filters.length === 0) {
        arrays = [];
      } else if (state.filters.length > 0 && state.filters[0] !== 'all') {
        state.filters.forEach((el) => {
          arrays.push(tt(el, sortOptimal([...state.tickets], action.limit, state.allTickets, state.limit)));
        });
      } else {
        arrays = sortOptimal([...state.tickets], action.limit, state.allTickets, state.limit);
      }
      return {
        ...state,
        tickets: arrays.flat(),
        sorted: 'optimal'
      };
    case 'ALL':
      let resAll = [];
      if (state.sorted === 'cheap') {
        resAll = sortPrice(action.payload, action.limit, state.allTickets, state.limit);
      } else if (state.sorted === 'fast') {
        resAll = sortDuration(action.payload, action.limit, state.allTickets, state.limit);
      } else if (state.sorted === 'optimal') {
        resAll = sortOptimal(action.payload, action.limit, state.allTickets, state.limit);
      }
      return {
        ...state,
        tickets: resAll,
        filters: action.filters
      };
    case 'NO_TRANSFERS':
      let resNo = [];
      resNo = filerSort(resNo, state, action);
      return {
        ...state,
        tickets: removeDuplicates([state.tickets, filerSort(resNo, state, action).filter((el) => el.segments[0].stops.length === 0)].flat()),
        filters: action.filters,
        limit: action.limit
      };
    case 'ONE_TRANSFERS':
      let resOne = [];
      resOne = filerSort(resOne, state, action);
      return {
        ...state,
        tickets: removeDuplicates([state.tickets, filerSort(resOne, state, action).filter((el) => el.segments[0].stops.length === 1)].flat()),
        filters: action.filters,
        limit: action.limit
      };
    case 'TWO_TRANSFERS':
      let resTwo = [];
      resTwo = filerSort(resTwo, state, action);
      return {
        ...state,
        tickets: removeDuplicates([state.tickets, filerSort(resTwo, state, action).filter((el) => el.segments[0].stops.length === 2)].flat()),
        filters: action.filters,
        limit: action.limit
      };
    case 'THIRD_TRANSFERS':
      let resThird = [];
      resThird = filerSort(resThird, state, action);
      return {
        ...state,
        tickets: removeDuplicates([state.tickets, filerSort(resThird, state, action).filter((el) => el.segments[0].stops.length === 3)].flat()),
        filters: action.filters,
        limit: action.limit
      };
      case 'TOGGLE_TICKET':
        return {
          ...state,
          tickets: toggleTicket(state.tickets, action.element),
          filters: [...state.filters.filter((n) => n !== action.element)]
        };
    case 'NONE':
      return {
        ...state,
        tickets: [],
        filters: action.filters
      };
    case 'FETCH_DATA_REQUEST':
      return {
        ...state,
        isLoading: true,
        tickets: []
      };
    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,
        tickets: sortPrice(action.payload.tickets, state.limit, action.payload),
        allTickets: [...action.payload],
        isLoading: true
      };
    case 'FETCH_DATA_ALL_SUCCESS':
      return {
        ...state,
        allTickets: [...action.payload],
        isLoading: false
      };
    default:
      return state;
  }
};

export default sortedReducer;
