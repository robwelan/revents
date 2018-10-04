import {
  ASYNC_ACTION_ERROR,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_START,
} from './asyncConstants';

export const asyncActionError = () => (
  {
    type: ASYNC_ACTION_ERROR,
  }
);

export const asyncActionFinish = () => (
  {
    type: ASYNC_ACTION_FINISH,
  }
);

export const asyncActionStart = () => (
  {
    type: ASYNC_ACTION_START,
  }
);
