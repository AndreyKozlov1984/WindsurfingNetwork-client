import { injectReducer } from '~/store/reducers';
import DashboardContainer from './containers/DashboardContainer';
import { initOrResume, default as reducer } from './modules/dashboard';

export default store => ({
  path: 'dashboard',
  onEnter: function () {
    injectReducer(store, { key: 'dashboard', reducer });
    store.dispatch(initOrResume());
  },
  component: DashboardContainer,
});

