// @flow
import { combineReducers, type Store, type AsyncReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export const makeRootReducer = (asyncReducers: AsyncReducers = {}) => {
  return combineReducers({
    routing: routerReducer,
    ...asyncReducers,
  });
};

type funcArg = { key: string, reducer: any };
export const injectReducer = (store: Store<*, *>, { key, reducer }: funcArg) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;

