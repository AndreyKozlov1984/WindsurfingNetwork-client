import { connect } from 'react-redux';
import { selectSpot } from '../modules/dashboard';

import SpotList from '../components/SpotList';

const mapDispatchToProps = {
  onSelectItem: selectSpot,
};

const mapStateToProps = function (state) {
  return {
    items: state.dashboard.data.spots,
    selectedItemId: state.dashboard.selectedItemId,
    scrollToSelected: state.dashboard.scrollToSelected,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpotList);

