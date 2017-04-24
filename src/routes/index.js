// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout';
import DashboardRoute from './Dashboard';
import PostsRoute from './Posts';
import SpotsRoute from './Spots';

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: DashboardRoute(store),
  childRoutes: [PostsRoute(store), SpotsRoute(store)],
});

export default createRoutes;

