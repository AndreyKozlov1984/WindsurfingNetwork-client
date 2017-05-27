// @flow
import React from 'react';
import { type RouteConfig, type Location } from '~/routes/types';
import { type Store } from 'redux';
import { type State } from '~/store/state';
import { type Action } from '~/store/action';
import { injectReducer } from '~/store/reducers';
import Chunk from '~/components/Chunk';

export default (store: Store<State, Action>): RouteConfig => ({
  path: 'spots',
  onEnter: async function (_nextState: any, _replace: any, cb: () => void) {
    const reducer = (await import(/* webpackChunkName: "spots" */ './modules/spots')).default;
    injectReducer(store, { key: 'spots', reducer });
    cb();
  },
  childRoutes: [
    {
      path: ':id',
      onEnter: async function (location: Location, _replace: any, cb: () => void) {
        const { fetchSpot } = await import(/* webpackChunkName: "spots" */ './modules/spots');
        store.dispatch(fetchSpot(+location.params.id));
        cb();
      },
      // eslint-disable-next-line react/display-name
      component: () => <Chunk load={() => import(/* webpackChunkName: "spots" */ './containers/SpotContainer')} />,
    },
    {
      path: ':id/edit',
      onEnter: async function (location: Location, _replace: any, cb: () => void) {
        const spotEditReducer = (await import(/* webpackChunkName: "spotEdit" */ './modules/spotEdit')).default;
        const { loadForm } = await import(/* webpackChunkName: "spotEdit" */ './modules/spotEdit');
        injectReducer(store, { key: 'spotEdit', reducer: spotEditReducer });
        store.dispatch(loadForm(+location.params.id));
        cb();
      },
      // eslint-disable-next-line react/display-name
      component: () => (
        <Chunk load={() => import(/* webpackChunkName: "spotEdit" */ './containers/SpotEditContainer')} />
      ),
    },
    {
      path: ':id/gallery',
      onEnter: async function (location: Location, _replace: any, cb: () => void) {
        const { loadGallery } = await import('./modules/spots');
        store.dispatch(loadGallery({ spotId: +location.params.id, selectedMonth: null }));
        cb();
      },
      // eslint-disable-next-line react/display-name
      component: () => (
        <Chunk load={() => import(/* webpackChunkName: "spots" */ './containers/SpotGalleryContainer')} />
      ),
    },
    {
      path: ':id/gallery/:month',
      onEnter: async function (location: Location, _replace: any, cb: () => void) {
        const { loadGallery } = await import(/* webpackChunkName: "spots" */ './modules/spots');
        store.dispatch(loadGallery({ spotId: +location.params.id, selectedMonth: +location.params.month }));
        cb();
      },
      // eslint-disable-next-line react/display-name
      component: () => (
        <Chunk load={() => import(/* webpackChunkName: "spots" */ './containers/SpotGalleryContainer')} />
      ),
    },
    {
      path: ':id/users',
      onEnter: async function (location: Location, _replace: any, cb: () => void) {
        const { loadSpotUsers } = await import(/* webpackChunkName: "spots" */ './modules/spots');
        store.dispatch(loadSpotUsers(+location.params.id));
        cb();
      },
      // eslint-disable-next-line react/display-name
      component: () => <Chunk load={() => import(/* webpackChunkName: "spots" */ './containers/SpotUsersContainer')} />,
    },
    {
      path: ':id/schools',
      onEnter: async function (location: Location, _replace: any, cb: () => void) {
        const { loadSpotSchools } = await import(/* webpackChunkName: "spots" */ './modules/spots');
        store.dispatch(loadSpotSchools(+location.params.id));
        cb();
      },
      // eslint-disable-next-line react/display-name
      component: () => (
        <Chunk load={() => import(/* webpackChunkName: "spots" */ './containers/SpotSchoolsContainer')} />
      ),
    },
  ],
});

