import { injectReducer } from '~/store/reducers';
import SpotContainer from './containers/SpotContainer';
import SpotUsersContainer from './containers/SpotUsersContainer';
import SpotGalleryContainer from './containers/SpotGalleryContainer';
import { fetchSpot, loadGallery, loadSpotUsers, default as reducer } from './modules/spots';

export default store => ({
  path: 'spots',
  onEnter: function () {
    injectReducer(store, { key: 'spots', reducer });
  },
  childRoutes: [
    {
      path: ':id',
      onEnter: function (location) {
        store.dispatch(fetchSpot(location.params.id));
      },
      component: SpotContainer,
    },
    {
      path: ':id/gallery',
      onEnter: function (location) {
        store.dispatch(loadGallery({ spotId: location.params.id, selectedMonth: null }));
      },
      component: SpotGalleryContainer,
    },
    {
      path: ':id/gallery/:month',
      onEnter: function (location) {
        store.dispatch(loadGallery({ spotId: location.params.id, selectedMonth: +location.params.month }));
      },
      component: SpotGalleryContainer,
    },
    {
      path: ':id/users',
      onEnter: async function (location) {
        store.dispatch(loadSpotUsers(location.params.id));
      },
      component: SpotUsersContainer,
    },
  ],
});

