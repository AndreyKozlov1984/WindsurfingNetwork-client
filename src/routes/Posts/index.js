// @flow
import React from 'react';
import { type Store } from 'redux';
import { type Location, type RouteConfig } from '~/routes/types';
import { type State } from '~/store/state';
import { type Action } from '~/store/action';
import { injectReducer } from '~/store/reducers';
import Chunk from '~/components/Chunk';

export default (store: Store<State, Action>): RouteConfig => ({
  path: 'posts',
  onEnter: async function (_nextState: any, _replace: any, cb: () => void) {
    const reducer = (await import(/* webpackChunkName: "posts" */ './modules/posts')).default;
    injectReducer(store, { key: 'posts', reducer });
    cb();
  },
  childRoutes: [
    {
      path: ':id',
      onEnter: async function (location: Location, _replace: any, cb: () => void) {
        const { setData, fetchPost } = await import(/* webpackChunkName: "posts" */ './modules/posts');
        store.dispatch(setData([]));
        store.dispatch(fetchPost(+location.params.id));
        cb();
      },
      // eslint-disable-next-line react/display-name
      component: () => <Chunk load={() => import(/* webpackChunkName: "posts" */ './containers/PostContainer')} />,
    },
  ],
  indexRoute: {
    onEnter: async function (_location: Location, _replace: any, cb: () => void) {
      const { init } = await import(/* webpackChunkName: "posts" */ './modules/posts');
      store.dispatch(init());
      cb();
    },
    // eslint-disable-next-line react/display-name
    component: () => <Chunk load={() => import(/* webpackChunkName: "posts" */ './containers/PostsContainer')} />,
  },
});

