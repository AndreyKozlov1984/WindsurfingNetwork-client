// @flow
import { connect } from 'react-redux';
import { setScroll } from '../modules/dashboard';
import { type State } from '~/store/state';

import { default as RightPart, type StateProps, type DispatchProps } from '../components/RightPart';

const mapDispatchToProps: DispatchProps = {
  onScroll: setScroll,
};

const mapStateToProps = function (state: State): StateProps {
  return {
    scrollPosition: state.dashboard.scrollPosition,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RightPart);

