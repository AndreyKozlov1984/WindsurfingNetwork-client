// @flow
import { connect } from 'react-redux';
import { type State } from '~/store/state';

import { default as Dashboard, type StateProps } from '../components/Dashboard';

const mapDispatchToProps = null;
const mapStateToProps = (state: State): StateProps => ({
  filters: state.dashboard.filters,
  isReady: !!state.dashboard.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

