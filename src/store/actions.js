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
export const all = (filters, data, limit) => {
  return {
    type: 'ALL',
    payload: data,
    limit: limit,
    filters: filters
  }
};
export const no = (filters, data, limit) => {
  return {
    type: 'NO_TRANSFERS',
    payload: data,
    filters: filters,
    limit: limit
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
export const none = (data, filters) => {
  return {
    type: 'NONE',
    payload: data,
    filters: filters
  }
}
export const toggle = (data, filters, el) => {
  return {
    type: 'TOGGLE_TICKET',
    payload: data,
    filters: filters,
    element: el
  }
}
export const fetchDataRequest = () => {
  return {
    type: 'FETCH_DATA_REQUEST'
  }
}
export const fetchDataSuccess = (data) => {
  return {
    type: 'FETCH_DATA_SUCCESS',
    payload: data
  }
};
export const fetchDataAllSuccess = (data) => {
  return {
    type: 'FETCH_DATA_ALL_SUCCESS',
    payload: data
  }
};

