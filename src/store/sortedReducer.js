import { data } from "../components/data"
const initialState = {
  tickets: data,
  datas: data
}
let arr = []
const sortedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHEAP':
      return {
       ...state,
       tickets: [...state.tickets].sort((a, b) => a.price - b.price),
      }
    case 'FAST':
      return {
       ...state,
       tickets: [...state.tickets].sort((a, b) => a.segments[0].duration - b.segments[0].duration),
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
      }
    case 'ALL':
      return {
        ...state,
        tickets: [...action.payload]
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
      default:
      return state;
  }
}
export default sortedReducer;