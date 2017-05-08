// @flow
import { combineReducers, type Store, type AsyncReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { type State } from '~/store/state';
import { type Action } from '~/store/action';

export const makeRootReducer = (asyncReducers: AsyncReducers = {}): Function => {
  return combineReducers({
    routing: routerReducer,
    ...asyncReducers,
  });
};

export const injectReducer = (store: Store<State, Action>, { key, reducer }: { key: string, reducer: any }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer; // eslint-disable-line immutable/no-mutation
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;

