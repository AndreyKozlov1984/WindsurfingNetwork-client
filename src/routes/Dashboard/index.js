// @flow
import React from 'react';
import { type State } from '~/store/state';
import { type Action } from '~/store/action';
import { injectReducer } from '~/store/reducers';
import Chunk from '~/components/Chunk';

export default (store: Store<State, Action>) => ({
  path: 'dashboard',
  onEnter: async function (_nextState: any, _replace: any, cb: () => void) {
    const reducer = (await import(/* webpackChunkName: "dashboard" */ './modules/dashboard')).default;
    const { initOrResume } = await import(/* webpackChunkName: "dashboard" */ './modules/dashboard');
    injectReducer(store, { key: 'dashboard', reducer });
    store.dispatch(initOrResume());
    cb();
  },
  // eslint-disable-next-line react/display-name
  component: () => <Chunk load={() => import(/* webpackChunkName: "dashboard" */ './containers/DashboardContainer')} />,
});

