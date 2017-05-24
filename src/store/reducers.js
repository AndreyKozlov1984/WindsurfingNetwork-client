// @flow
import { combineReducers, type Store, type AsyncReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { type State } from '~/store/state';
import { type Action } from '~/store/action';
import { authStateReducer } from 'redux-auth';

export const makeRootReducer = (asyncReducers: AsyncReducers = {}): Function => {
  return combineReducers({
    routing: routerReducer,
    form: formReducer,
    auth: authStateReducer,
    ...asyncReducers,
  });
};

export const injectReducer = (store: Store<State, Action>, { key, reducer }: { key: string, reducer: any }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer; // eslint-disable-line immutable/no-mutation
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;

