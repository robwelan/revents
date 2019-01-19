import {
  COUNTER_ACTION_FINISHED,
  COUNTER_ACTION_STARTED,
  DECREMENT_COUNTER,
  INCREMENT_COUNTER,
} from './testConstants';
import firebase from '../../app/config/firebase';

export const incrementCounter = () => ({
  type: INCREMENT_COUNTER,
});

export const decrementCounter = () => ({
  type: DECREMENT_COUNTER,
});

export const finishCounterAction = () => ({
  type: COUNTER_ACTION_FINISHED,
});

export const startCounterAction = () => ({
  type: COUNTER_ACTION_STARTED,
});

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const decrementAsync = () => async (dispatch) => {
  dispatch(startCounterAction());
  await delay(1000);
  dispatch({ type: DECREMENT_COUNTER });
  dispatch(finishCounterAction());
};

export const incrementAsync = () => async (dispatch) => {
  dispatch(startCounterAction());
  await delay(1000);
  dispatch({ type: INCREMENT_COUNTER });
  dispatch(finishCounterAction());
};

export const testPermission = () => async (dispatch, getState) => {
  const firestore = firebase.firestore();

  try {
    const userDocRef = await firestore
      .collection('users')
      .doc('XZm6Snl37BQhew8lNQ2uTWHOwsh1');

    userDocRef.update({
      displayName: 'testing',
    });
  } catch (error) {
    console.error(error);
  }
};
