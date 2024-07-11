import {data} from "../data";

// const initialState = {
//   datas: data,
//   transfers: []
// }
// let arr = [];
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'CHEAP':
//       return {
//         ...state,
//         datas: [...action.payload].sort((a, b) => a.price - b.price)
//       }
//     case 'FAST':
//       return {
//         ...state,
//         datas: [...action.payload].sort((a, b) => a.segments[0].duration - b.segments[0].duration)
//       }
//     case 'OPTIMAL':
//         return {
//           ...state,
//         }
//     case 'ALL':
//       return {
//         ...state,
//         datas: action.payload,
//       }
//     case 'NO_TRANSFERS':
//       arr.push(action.payload.filter((el) => el.segments[0].stops.length === 0)[0]);
//       return {
//         ...state,
//         datas: [...action.payload].filter((el) => el.segments[0].stops.length === 0)[0]
//       }
//     case 'ONE_TRANSFERS':
//       console.log (state.transfers)
//       if (!arr.find((el) => el.segments[0].stops.length === 1)) {
//         arr.push(action.payload.filter((el) => el.segments[0].stops.length === 1)[0]);
//       }
//       //arr.push(action.payload.filter((el) => el.segments[0].stops.length === 1)[0]);
//       return {
//         ...state,
//         datas: [...action.payload].filter((el) => el.segments[0].stops.length === 1),
//         transfers: [...arr]
//         // datas: [...arr]
//       }
//     case 'TWO_TRANSFERS':
//       if (!arr.find((el) => el.segments[0].stops.length === 2)) {
//         arr.push(action.payload.filter((el) => el.segments[0].stops.length === 2)[0]);
//       }
//       console.log(state.transfers)
//       // arr.push(action.payload.filter((el) => el.segments[0].stops.length === 2)[0]);
//       return {
//         ...state,
//         datas: [...action.payload].filter((el) => el.segments[0].stops.length === 2),
//         transfers: [...arr]
//       }
//     case 'THIRD_TRANSFERS':
//       if (!arr.find((el) => el.segments[0].stops.length === 3)) {
//         arr.push(action.payload.filter((el) => el.segments[0].stops.length === 3)[0]);
//       }
//       console.log(state.transfers)
//       // arr.push(action.payload.filter((el) => el.segments[0].stops.length === 3)[0]);
//       return {
//         ...state,
//         // datas: [...action.payload].filter((el) => el.segments[0].stops.length === 1)
//         datas: [...arr]
//       }
//     case 'NONE':
//       return {
//         ...state,
//         datas: []
//       }
//     default:
//       return state;
//   }
// };
// export default reducer;

// const initialState = {
//   tickets: data
// }
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'CHEAP':
//       return {
//        ...state, tickets: [...state.tickets].sort((a, b) => a.price - b.price)
//       }
//     case 'FAST':
//       return {
//        ...state, tickets: [...state.tickets].sort((a, b) => a.segments[0].duration - b.segments[0].duration)
//       }
//     // case 'DEC':
//     //   return {
//     //     ...state, tickets: state.tickets + action.payload
//     //   }
//     default:
//       return state
//   }
// }
// export default reducer;