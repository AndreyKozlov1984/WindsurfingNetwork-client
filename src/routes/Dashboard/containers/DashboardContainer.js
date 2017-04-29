import { connect } from 'react-redux';
import { setFilterState, selectAll, selectNone } from '../modules/dashboard';

import Dashboard from '../components/Dashboard';

const mapDispatchToProps = {
  setFilterState,
  selectAll,
  selectNone,
};

const mapStateToProps = state => ({
  filters: state.dashboard.filters,
  isReady: !!state.dashboard.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

