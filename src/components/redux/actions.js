import { data } from "../data";
export const cheap = () => {
  return {
    type: 'CHEAP',
    payload: data
  }
};
export const fast = () => {
  return {
    type: 'FAST',
    payload: data
  }
};
export const optimal = () => ({type: 'OPTIMAL'});