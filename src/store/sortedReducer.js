// import { data } from "../components/data"
const initialState = {
  tickets: [],
  sorted: 'cheap'
}
let arr = []
const sortedReducer = (state = initialState, action) => {
  // console.log(state.tickets, action.payload, action.type)
  switch (action.type) {
    case 'CHEAP':
      return {
        ...state,
        tickets: [...state.tickets].sort((a, b) => a.price - b.price),
        sorted: 'cheap'
      }
    case 'FAST':
      return {
        ...state,
        tickets: [...state.tickets].sort((a, b) => a.segments[0].duration - b.segments[0].duration),
        sorted: 'fast'
      }
    case 'OPTIMAL':
      function optimalSorting(el) {
        const aDur = el.segments[0].duration + el.segments[1].duration;
        const aPrice = el.price + aDur;
        return aPrice;
      }
      return {
        ...state,
        tickets: [...state.tickets].sort((a, b) => optimalSorting(a) - optimalSorting(b)),
        sorted: 'optimal'
      }
    case 'ALL':
      if (state.sorted === 'cheap') {
        return {
          ...state,
          tickets: action.payload.sort((a, b) => a.price - b.price)
        }
      } else if (state.sorted === 'fast') {
        return {
          ...state,
          tickets: action.payload.sort((a, b) => a.segments[0].duration - b.segments[0].duration)
        }
      } else if (state.sorted === 'optimal') {
        return {
          ...state,
          tickets: action.payload.sort((a, b) => optimalSorting(a) - optimalSorting(b))
        }
      }
    case 'NO_TRANSFERS':
     
    if (action.filters.length > 1 && !state.tickets.find((el) => el.segments[0].stops.length === 0)) {
      return {
        ...state,
        tickets: [[...state.tickets], [...action.payload.filter((el) => el.segments[0].stops.length === 0)]].flat()
      }
    } else {
      return {
        ...state,
        tickets: [...action.payload.filter((el) => el.segments[0].stops.length === 0)]
      }
    }
    case 'ONE_TRANSFERS':
      if (action.filters.length > 1 && !state.tickets.find((el) => el.segments[0].stops.length === 1)) {
        return {
          ...state,
          tickets: [[...state.tickets], [...action.payload.filter((el) => el.segments[0].stops.length === 1)]].flat()
        }
      } else {
        return {
          ...state,
          tickets: [...action.payload.filter((el) => el.segments[0].stops.length === 1)]
        }
      }
    case 'TWO_TRANSFERS':
      if (action.filters.length > 1 && !state.tickets.find((el) => el.segments[0].stops.length === 2)) {
        return {
          ...state,
          tickets: [[...state.tickets], [...action.payload.filter((el) => el.segments[0].stops.length === 2)]].flat()
        }
      } else {
        return {
          ...state,
          tickets: [...action.payload.filter((el) => el.segments[0].stops.length === 2)]
        }
      }
      
    case 'THIRD_TRANSFERS':
      if (action.filters.length > 1 && !state.tickets.find((el) => el.segments[0].stops.length === 3)) {
        return {
          ...state,
          tickets: [[...state.tickets], [...action.payload.filter((el) => el.segments[0].stops.length === 3)]].flat()
        }
      } else {
        return {
          ...state,
          tickets: [...action.payload.filter((el) => el.segments[0].stops.length === 3)]
        }
      }
    case 'NONE':
      return {
        ...state,
        tickets: []
      }
    case 'FETCH_DATA_REQUEST':
      return {
        ...state,
        isLoading: true,
        tickets: []
      };
    case 'ADD_TICKETS':
      localStorage.setItem('tickets', JSON.stringify(action.payload.tickets))
      return {
        ...state,
        tickets: action.payload.tickets.slice(0, 5).sort((a, b) => a.price - b.price),
        isLoading: false,
      }
      case 'FETCH_DATA_FAILURE':
      return {
        ...state,
        isLoading: false,
        tickets: state.tickets,
        error: action.payload,
      };
      default:
      return state;
  }
}
export default sortedReducer;