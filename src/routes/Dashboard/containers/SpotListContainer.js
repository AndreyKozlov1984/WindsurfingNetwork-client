// @flow
import { connect } from 'react-redux';
import { selectSpot } from '../modules/dashboard';
import { type State } from '~/store/state';

import { default as SpotList, type StateProps, type DispatchProps } from '../components/SpotList';

const mapDispatchToProps: DispatchProps = {
  onSelectItem: selectSpot,
};

const mapStateToProps = function (state: State): StateProps {
  const spotsCount = state.dashboard.data ? state.dashboard.data.spots.count : 0;
  return {
    count: spotsCount,
    selectedItemId: state.dashboard.selectedItemId,
    filters: state.dashboard.filters,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpotList);

