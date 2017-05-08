// @flow
import { applyMiddleware, compose, createStore, type Store } from 'redux';
import { type State } from '~/store/state';
import { type Action } from '~/store/action';
import thunk from 'redux-thunk';
import makeRootReducer from './reducers';
import logger from 'redux-logger';

export default (initialState: any = {}): Store<State, Action> => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk, logger];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];

  const composeEnhancers = (() => {
    declare var __DEV__: boolean;
    if (__DEV__) {
      const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
      if (typeof composeWithDevToolsExtension === 'function') {
        return composeWithDevToolsExtension;
      }
    }
    return compose();
  })();

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middleware), ...enhancers),
  );
  store.asyncReducers = {}; // eslint-disable-line immutable/no-mutation

  declare var module: { hot?: { accept: Function } };
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};

