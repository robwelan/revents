import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import { reducer as ToastReducer } from 'react-redux-toastr';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import asyncReducer from '../../features/async/asyncReducer';
import authReducer from '../../features/auth/authReducer';
import eventReducer from '../../features/events/eventReducer';
import modalsReducer from '../../features/modals/modalReducer';
import testReducer from '../../features/testarea/testReducer';

const rootReducer = combineReducers({
  async: asyncReducer,
  auth: authReducer,
  events: eventReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  form: FormReducer,
  modals: modalsReducer,
  test: testReducer,
  toastr: ToastReducer,
});

export default rootReducer;
