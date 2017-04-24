import { injectReducer } from '~/store/reducers';
import DashboardContainer from './containers/DashboardContainer';
import { init, default as reducer } from './modules/dashboard';

export default store => ({
  path: 'dashboard',
  onEnter: function () {
    injectReducer(store, { key: 'dashboard', reducer });
    store.dispatch(init());
  },
  component: DashboardContainer,
});

