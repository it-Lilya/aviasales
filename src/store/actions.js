// import { data } from "../components/data";
export const cheap = (data) => {
  return {
    type: 'CHEAP',
    payload: data
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
export const no = (data, filters) => {
  return {
    type: 'NO_TRANSFERS',
    payload: data,
    filters: filters
  }
};
export const one = (data, filters) => {
  return {
    type: 'ONE_TRANSFERS',
    payload: data,
    filters: filters
  }
};
export const two = (data, filters) => {
  return {
    type: 'TWO_TRANSFERS',
    payload: data,
    filters: filters
  }
};
export const third = (data, filters) => {
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

// export const INC = 'INC';
// export const DEC = 'DEC';

// export const cheap = (data) => {
//   return {
//     type: 'CHEAP',
//     payload: data
//   }
// }
// export const fast = (data) => {
//   return {
//     type: 'FAST',
//     payload: data
//   }
// }


// export const all = (data) => {
//   return {
//     type: 'FAST',
//     payload: data
//   }
// }
