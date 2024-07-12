// import { data } from "../components/data";
// let r = JSON.parse(localStorage.getItem('t')).sort((a, b) => a.price - b.price);
export const cheap = (data) => {
  return {
    type: 'CHEAP',
    payload: data,
  }
};
export const fast = (data) => {
  return {
    type: 'FAST',
    payload: data
  }
};
export const optimal = (data) => {
  return {
    type: 'OPTIMAL',
    payload: data
  }
};
export const all = (data) => {
  return {
    type: 'ALL',
    payload: data
  }
};
export const no = (filters, data) => {
  return {
    type: 'NO_TRANSFERS',
    payload: data,
    filters: filters
  }
};
export const one = (filters, data) => {
  return {
    type: 'ONE_TRANSFERS',
    payload: data,
    filters: filters
  }
};
export const two = (filters, data) => {
  return {
    type: 'TWO_TRANSFERS',
    payload: data,
    filters: filters
  }
};
export const third = (filters, data) => {
  return {
    type: 'THIRD_TRANSFERS',
    payload: data,
    filters: filters
  }
};
export const none = () => {
  return {
    type: 'NONE',
    payload: []
  }
}
export const addTickets = (tickets) => {
  console.log(tickets)
  return {
  type: 'ADD_TICKETS',
  payload: tickets}
}