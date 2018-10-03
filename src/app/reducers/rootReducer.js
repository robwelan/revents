import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import authReducer from '../../features/auth/authReducer';
import eventReducer from '../../features/events/eventReducer';
import modalsReducer from '../../features/modals/modalReducer';
import testReducer from '../../features/testarea/testReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  form: FormReducer,
  test: testReducer,
  events: eventReducer,
  modals: modalsReducer,
});

export default rootReducer;
