const initialState = {
  tickets: [],
  sorted: 'cheap',
  filters: ['all'],
  limit: 5,
  allTickets: [],
  activeLimit: 5,
  isLoading: true,
};

const sortPrice = (arr, limit, all, prevLimit) => {
  if (limit !== prevLimit) {
    return all.slice(0, limit).sort((a, b) => a.price - b.price);
  }
  return arr.slice(0, limit).sort((a, b) => a.price - b.price);
};

const sortDuration = (arr, limit, all, prevLimit) => {
  if (limit !== prevLimit) {
    return all.slice(0, limit).sort((a, b) => a.segments[0].duration - b.segments[0].duration);
  }
  return arr.slice(0, limit).sort((a, b) => a.segments[0].duration - b.segments[0].duration);
};

const sortOptimal = (arr, limit, all, prevLimit) => {
  if (limit !== prevLimit) {
    return all
      .slice(0, limit)
      .sort(
        (a, b) => a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
      );
  }
  return arr
    .slice(0, limit)
    .sort(
      (a, b) => a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
    );
};

const filtration = (arr, num, s) => {
  return arr.filter((el) => el.segments[s].stops.length === num);
};

const tt = (el, arr) => {
  if (el === 'one_transfers') {
    return filtration(arr, 1, 0);
  } else if (el === 'two_transfers') {
    return filtration(arr, 2, 0);
  } else if (el === 'third_transfers') {
    return filtration(arr, 3, 0);
  } else if (el === 'no_transfers') {
    return filtration(arr, 0, 0);
  }
};

const filterSort = (arr, state, action) => {
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
  let stopsCount;
  switch (elem) {
    case 'one_transfers':
      stopsCount = 1;
      break;
    case 'two_transfers':
      stopsCount = 2;
      break;
    case 'third_transfers':
      stopsCount = 3;
      break;
    case 'no_transfers':
      stopsCount = 0;
      break;
    default:
      return [];
  }
  return tickets.filter((t) => t.segments[0].stops.length !== stopsCount && t.segments[1].stops.length !== stopsCount);
};
const removeDuplicates = (arr) => {
  const uniqueTickets = [];
  const ticketSet = new Set();
  arr.forEach((ticket) => {
    const ticketString = JSON.stringify(ticket);
    if (!ticketSet.has(ticketString)) {
      ticketSet.add(ticketString);
      uniqueTickets.push(ticket);
    }
  });

  return uniqueTickets;
};
const searchDirection = (arr, quantity) => {
  let oneSegments = arr.filter((el) => el.segments[0].stops.length === quantity);
  let twoSegments = arr.filter((el) => el.segments[1].stops.length === quantity);
  if (oneSegments.length > 0 && twoSegments.length > 0) {
    return twoSegments.concat(oneSegments);
  }
  if (oneSegments.length === 0) {
    return twoSegments;
  } else {
    return oneSegments;
  }
};
const sortedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHEAP': {
      let array = [];
      if (state.filters.length === 0) {
        array = [];
      } else if (state.filters.length === 1) {
        array = sortPrice([...state.tickets], action.limit, state.allTickets, state.limit);
      } else {
        state.filters.forEach((el) => {
          array.push(tt(el, sortPrice([...state.tickets], action.limit, state.allTickets, state.limit)));
        });
      }
      if (state.filters.length === 1 && state.filters[0] !== 'all') {
        let res = [];
        state.filters.forEach((el) => {
          if (el === 'one_transfers') {
            res.push(searchDirection(array.flat(), 1));
          } else if (el === 'two_transfers') {
            res.push(searchDirection(array.flat(), 2));
          } else if (el === 'third_transfers') {
            res.push(searchDirection(array.flat(), 3));
          } else if (el === 'no_transfers') {
            res.push(searchDirection(array.flat(), 0));
          }
        });
        return {
          ...state,
          tickets: removeDuplicates(res.flat()).sort((a, b) => a.price - b.price),
          sorted: 'cheap',
        };
      } else {
        let res = [];
        state.filters.forEach((el) => {
          if (el === 'one_transfers') {
            res.push(searchDirection(array.flat(), 1));
          } else if (el === 'two_transfers') {
            res.push(searchDirection(array.flat(), 2));
          } else if (el === 'third_transfers') {
            res.push(searchDirection(array.flat(), 3));
          } else if (el === 'no_transfers') {
            res.push(searchDirection(array.flat(), 0));
          }
        });
        return {
          ...state,
          tickets: removeDuplicates(res.flat()).sort((a, b) => a.price - b.price),
          sorted: 'cheap',
        };
      }
    }
    case 'FAST': {
      let arr = [];
      if (state.filters.length === 0) {
        arr = [];
      } else if (state.filters.length === 1) {
        arr = sortDuration([...state.tickets], action.limit, state.allTickets, state.limit);
      } else {
        state.filters.forEach((el) => {
          arr.push(tt(el, sortDuration([...state.tickets], action.limit, state.allTickets, state.limit)));
        });
      }
      if (state.filters.length === 1 && state.filters[0] !== 'all') {
        let res = [];
        state.filters.forEach((el) => {
          if (el === 'one_transfers') {
            res.push(searchDirection(arr.flat(), 1));
          } else if (el === 'two_transfers') {
            res.push(searchDirection(arr.flat(), 2));
          } else if (el === 'third_transfers') {
            res.push(searchDirection(arr.flat(), 3));
          } else if (el === 'no_transfers') {
            res.push(searchDirection(arr.flat(), 0));
          }
        });
        return {
          ...state,
          tickets: removeDuplicates(res.flat()).sort((a, b) => a.segments[0].duration - b.segments[0].duration),
          sorted: 'fast',
        };
      } else if (state.filters.length === 1 && state.filters[0] === 'all') {
        return {
          ...state,
          tickets: arr.sort((a, b) => a.segments[0].duration - b.segments[0].duration),
          sorted: 'fast',
        };
      } else {
        let res = [];
        state.filters.forEach((el) => {
          if (el === 'one_transfers') {
            res.push(searchDirection(arr.flat(), 1));
          } else if (el === 'two_transfers') {
            res.push(searchDirection(arr.flat(), 2));
          } else if (el === 'third_transfers') {
            res.push(searchDirection(arr.flat(), 3));
          } else if (el === 'no_transfers') {
            res.push(searchDirection(arr.flat(), 0));
          }
        });
        return {
          ...state,
          tickets: removeDuplicates(res.flat()).sort((a, b) => a.segments[0].duration - b.segments[0].duration),
          sorted: 'fast',
        };
      }
    }
    case 'OPTIMAL': {
      let arrays = [];
      if (state.filters.length === 0) {
        arrays = [];
      } else if (state.filters.length === 1) {
        arrays = sortOptimal([...state.tickets], action.limit, state.allTickets, state.limit);
      } else {
        state.filters.forEach((el) => {
          arrays.push(tt(el, sortOptimal([...state.tickets], action.limit, state.allTickets, state.limit)));
        });
      }
      if (state.filters.length === 1 && state.filters[0] !== 'all') {
        let res = [];
        state.filters.forEach((el) => {
          if (el === 'one_transfers') {
            res.push(searchDirection(arrays.flat(), 1));
          } else if (el === 'two_transfers') {
            res.push(searchDirection(arrays.flat(), 2));
          } else if (el === 'third_transfers') {
            res.push(searchDirection(arrays.flat(), 3));
          } else if (el === 'no_transfers') {
            res.push(searchDirection(arrays.flat(), 0));
          }
        });
        return {
          ...state,
          tickets: removeDuplicates(res.flat()).sort(
            (a, b) =>
              a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
          ),
          sorted: 'optimal',
        };
      } else if (state.filters.length === 1 && state.filters[0] === 'all') {
        return {
          ...state,
          tickets: arrays.sort(
            (a, b) =>
              a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
          ),
          sorted: 'optimal',
        };
      } else {
        let res = [];
        state.filters.forEach((el) => {
          if (el === 'one_transfers') {
            res.push(searchDirection(arrays.flat(), 1));
          } else if (el === 'two_transfers') {
            res.push(searchDirection(arrays.flat(), 2));
          } else if (el === 'third_transfers') {
            res.push(searchDirection(arrays.flat(), 3));
          } else if (el === 'no_transfers') {
            res.push(searchDirection(arrays.flat(), 0));
          }
        });
        return {
          ...state,
          tickets: removeDuplicates(res.flat()).sort(
            (a, b) =>
              a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
          ),
          sorted: 'optimal',
        };
      }
    }
    case 'ALL': {
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
        tickets: filterSort(resAll, state, action),
        filters: action.filters,
      };
    }
    case 'NO_TRANSFERS': {
      let resNo = [];
      resNo = filterSort(resNo, state, action);
      if (state.sorted === 'cheap') {
        resNo = removeDuplicates([...state.tickets, searchDirection(resNo, 0)].flat());
      } else if (state.sorted === 'fast') {
        resNo = removeDuplicates([...state.tickets, searchDirection(resNo, 0)].flat());
      } else if (state.sorted === 'optimal') {
        resNo = removeDuplicates([...state.tickets, searchDirection(resNo, 0)].flat());
      }
      return {
        ...state,
        tickets: filterSort(resNo, action.filters, state, action),
        filters: action.filters,
        limit: action.limit,
      };
    }
    case 'ONE_TRANSFERS': {
      let resOne = [];
      resOne = filterSort(resOne, state, action);
      if (state.sorted === 'cheap') {
        resOne = removeDuplicates([...state.tickets, searchDirection(resOne, 1)].flat());
      } else if (state.sorted === 'fast') {
        resOne = removeDuplicates([...state.tickets, searchDirection(resOne, 1)].flat());
      } else if (state.sorted === 'optimal') {
        resOne = removeDuplicates([...state.tickets, searchDirection(resOne, 1)].flat());
      }
      return {
        ...state,
        tickets: filterSort(resOne, action.filters, state, action),
        filters: action.filters,
        limit: action.limit,
      };
    }
    case 'TWO_TRANSFERS': {
      let resTwo = [];
      resTwo = filterSort(resTwo, state, action);
      if (state.sorted === 'cheap') {
        resTwo = removeDuplicates([...state.tickets, searchDirection(resTwo, 2)].flat());
      } else if (state.sorted === 'fast') {
        resTwo = removeDuplicates([...state.tickets, searchDirection(resTwo, 2)].flat());
      } else if (state.sorted === 'optimal') {
        resTwo = removeDuplicates([...state.tickets, searchDirection(resTwo, 2)].flat());
      }
      return {
        ...state,
        tickets: filterSort(resTwo, action.filters, state, action),
        filters: action.filters,
        limit: action.limit,
      };
    }
    case 'THIRD_TRANSFERS': {
      let resThird = [];
      resThird = filterSort(resThird, state, action);
      if (state.sorted === 'cheap') {
        resThird = removeDuplicates([...state.tickets, searchDirection(resThird, 3)].flat());
      } else if (state.sorted === 'fast') {
        resThird = removeDuplicates([...state.tickets, searchDirection(resThird, 3)].flat());
      } else if (state.sorted === 'optimal') {
        resThird = removeDuplicates([...state.tickets, searchDirection(resThird, 3)].flat());
      }
      return {
        ...state,
        tickets: filterSort(resThird, action.filters, state, action),
        filters: action.filters,
        limit: action.limit,
      };
    }
    case 'TOGGLE_TICKET': {
      return {
        ...state,
        tickets: toggleTicket(state.tickets, action.element),
        filters: [...state.filters.filter((n) => n !== action.element)],
      };
    }
    case 'NONE': {
      return {
        ...state,
        tickets: [],
        filters: action.filters,
      };
    }
    case 'FETCH_DATA_REQUEST': {
      return {
        ...state,
        isLoading: true,
        tickets: [],
      };
    }
    case 'FETCH_DATA_SUCCESS': {
      return {
        ...state,
        tickets: sortPrice(action.payload.tickets, state.limit, action.payload),
        allTickets: [...action.payload],
        isLoading: true,
      };
    }
    case 'FETCH_DATA_ALL_SUCCESS': {
      return {
        ...state,
        allTickets: [...action.payload],
        isLoading: false,
      };
    }
    case 'FETCH_DATA_FAILURE': {
      return {
        ...state,
        tickets: [],
        isLoading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default sortedReducer;
