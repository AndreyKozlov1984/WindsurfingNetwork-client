// @flow
import { type RouteConfig, type Location } from '~/routes/types';
import { type Store } from 'redux';
import { type State } from '~/store/state';
import { type Action } from '~/store/action';
import { injectReducer } from '~/store/reducers';
import SpotContainer from './containers/SpotContainer';
import SpotUsersContainer from './containers/SpotUsersContainer';
import SpotSchoolsContainer from './containers/SpotSchoolsContainer';
import SpotGalleryContainer from './containers/SpotGalleryContainer';
import SpotEditContainer from './containers/SpotEditContainer';
import { fetchSpot, loadGallery, loadSpotUsers, loadSpotSchools, default as reducer } from './modules/spots';
import { loadForm, default as spotEditReducer } from './modules/spotEdit';

export default (store: Store<State, Action>): RouteConfig => ({
  path: 'spots',
  onEnter: function () {
    injectReducer(store, { key: 'spots', reducer });
  },
  childRoutes: [
    {
      path: ':id',
      onEnter: function (location: Location) {
        store.dispatch(fetchSpot(+location.params.id));
      },
      component: SpotContainer,
    },
    {
      path: ':id/edit',
      onEnter: function (location: Location) {
        injectReducer(store, { key: 'spotEdit', reducer: spotEditReducer });
        store.dispatch(loadForm(+location.params.id));
      },
      component: SpotEditContainer,
    },
    {
      path: ':id/gallery',
      onEnter: function (location: Location) {
        store.dispatch(loadGallery({ spotId: +location.params.id, selectedMonth: null }));
        console.info('test');
      },
      component: SpotGalleryContainer,
    },
    {
      path: ':id/gallery/:month',
      onEnter: function (location: Location) {
        store.dispatch(loadGallery({ spotId: +location.params.id, selectedMonth: +location.params.month }));
      },
      component: SpotGalleryContainer,
    },
    {
      path: ':id/users',
      onEnter: function (location: Location) {
        store.dispatch(loadSpotUsers(+location.params.id));
      },
      component: SpotUsersContainer,
    },
    {
      path: ':id/schools',
      onEnter: function (location: Location) {
        store.dispatch(loadSpotSchools(+location.params.id));
      },
      component: SpotSchoolsContainer,
    },
  ],
});

