// @flow
import { type State } from '~/store/state';
import { type Action } from '~/store/action';
import { injectReducer } from '~/store/reducers';
import DashboardContainer from './containers/DashboardContainer';
import { initOrResume, default as reducer } from './modules/dashboard';

export default (store: Store<State, Action>) => ({
  path: 'dashboard',
  onEnter: function () {
    injectReducer(store, { key: 'dashboard', reducer });
    store.dispatch(initOrResume());
  },
  component: DashboardContainer,
});

