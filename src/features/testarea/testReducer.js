import createReducer from '../../app/common/util/reducerUtil';
import {
  COUNTER_ACTION_FINISHED,
  COUNTER_ACTION_STARTED,
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
} from './testConstants';

const initialState = {
  data: 42,
  loading: false,
};

export const incrementCounter = (state, payload) => {
  return {
    ...state,
    data: state.data + 1,
  };
};

export const decrementCounter = (state, payload) => {
  return {
    ...state,
    data: state.data - 1,
  };
};

export const counterActionStarted = (state, payload) => {
  return { ...state, loading: true };
};

export const counterActionFinished = (state, payload) => {
  return { ...state, loading: false };
};


// const testReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case INCREMENT_COUNTER:
//       return {
//         ...state,
//         data: state.data + 1,
//       };
//     case DECREMENT_COUNTER:
//       return {
//         ...state,
//         data: state.data - 1,
//       };
//     default:
//       return state;
//   }
// };

export default createReducer(initialState, {
  [COUNTER_ACTION_FINISHED]: counterActionFinished,
  [COUNTER_ACTION_STARTED]: counterActionStarted,
  [DECREMENT_COUNTER]: decrementCounter,
  [INCREMENT_COUNTER]: incrementCounter,
});
