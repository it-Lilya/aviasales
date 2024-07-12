// import { data } from "../components/data";
// let r = JSON.parse(localStorage.getItem('t')).sort((a, b) => a.price - b.price);
export const cheap = (limit, data) => {
  return {
    type: 'CHEAP',
    payload: data,
    limit: limit
  }
};
export const fast = (limit, data) => {
  return {
    type: 'FAST',
    payload: data,
    limit: limit
  }
};
export const optimal = (limit, data) => {
  return {
    type: 'OPTIMAL',
    payload: data,
    limit: limit
  }
};
export const all = (data, limit) => {
  return {
    type: 'ALL',
    payload: data,
    limit: limit
  }
};
export const no = (filters, data) => {
  return {
    type: 'NO_TRANSFERS',
    payload: data,
    filters: filters
  }
};
export const one = (filters, data, limit) => {
  return {
    type: 'ONE_TRANSFERS',
    payload: data,
    filters: filters,
    limit: limit
  }
};
export const two = (filters, data, limit) => {
  return {
    type: 'TWO_TRANSFERS',
    payload: data,
    filters: filters,
    limit: limit
  }
};
export const third = (filters, data, limit) => {
  return {
    type: 'THIRD_TRANSFERS',
    payload: data,
    filters: filters,
    limit: limit
  }
};
export const none = (data, limit) => {
  return {
    type: 'NONE',
    payload: data,
    limit: limit
  }
}
export const addTickets = (tickets) => {
  console.log(tickets)
  return {
  type: 'ADD_TICKETS',
  payload: tickets}
}