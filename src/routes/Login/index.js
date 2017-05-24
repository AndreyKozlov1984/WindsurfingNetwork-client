// @flow
import { type Store } from 'redux';
import { type RouteConfig } from '~/routes/types';
import { type State } from '~/store/state';
import { type Action } from '~/store/action';
import LoginContainer from './containers/LoginContainer';
export default (store: Store<State, Action>): RouteConfig => ({
  path: 'login',
  childRoutes: [],
  indexRoute: {
    component: LoginContainer,
  },
});

