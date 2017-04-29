import { connect } from 'react-redux';
import { setScroll } from '../modules/dashboard';

import RightPart from '../components/RightPart';

const mapDispatchToProps = {
  onScroll: setScroll,
};

const mapStateToProps = function (state) {
  return {
    scrollPosition: state.dashboard.scrollPosition,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RightPart);

