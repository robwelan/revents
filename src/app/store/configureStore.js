import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/rootReducer';

const configureStore = (preloadedState) => {
  const middlewares = [];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const storeEnhancers = [middlewareEnhancer];
  let composedEnhancer;

  if (process.env.NODE_ENV === 'development') {
    composedEnhancer = composeWithDevTools(...storeEnhancers);
  } else {
    composedEnhancer = compose(...storeEnhancers);
  }

  const store = createStore(
    rootReducer,
    preloadedState,
    composedEnhancer,
  );

  return store;
};

export default configureStore;
