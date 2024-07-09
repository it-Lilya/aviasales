
import { data } from "../data";

const initialState = {
  datas: data,
}
const reducer = (state = initialState, action) => {
  console.log(action.type)
  switch (action.type) {
    case 'CHEAP':
      return {
        ...state,
        datas: [
          [...action.payload].sort((a, b) => a.price - b.price)
        ]
      }
    case 'FAST':
      return {
        ...state,
        datas: [
          [...action.payload].sort((a, b) => a.segments[0].duation - b.segments[0].duation)
        ]
      }
    case 'OPTIMAL':
        return {
          ...state,
        }
    default:
      console.log('1');
      return state;
  }
};
export default reducer;