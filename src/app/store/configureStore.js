import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import firebase from '../config/firebase';

const reactReduxFirebaseConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  updateProfileOnLogin: false,
  useFirestoreForProfile: true,
};

const configureStore = (preloadedState) => {
  const middlewares = [
    thunk.withExtraArgument({ getFirebase, getFirestore }),
  ];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const storeEnhancers = [middlewareEnhancer];
  let composedEnhancer;

  if (process.env.NODE_ENV === 'development') {
    composedEnhancer = composeWithDevTools(
      ...storeEnhancers,
      reactReduxFirebase(firebase, reactReduxFirebaseConfig),
      reduxFirestore(firebase),
    );
  } else {
    composedEnhancer = compose(
      ...storeEnhancers,
      reactReduxFirebase(firebase, reactReduxFirebaseConfig),
      reduxFirestore(firebase),
    );
  }

  const store = createStore(
    rootReducer,
    preloadedState,
    composedEnhancer,
  );

  return store;
};

export default configureStore;
