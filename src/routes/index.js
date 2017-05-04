// @flow
// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout';
import { type State } from '~/store/state';
import { type Action } from '~/store/action';
import DashboardRoute from './Dashboard';
import PostsRoute from './Posts';
import SpotsRoute from './Spots';
import { type RouteConfig } from '~/routes/types';

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store: Store<State, Action>): RouteConfig => ({
  path: '/',
  component: CoreLayout,
  indexRoute: DashboardRoute(store),
  childRoutes: [PostsRoute(store), SpotsRoute(store)],
});

export default createRoutes;

