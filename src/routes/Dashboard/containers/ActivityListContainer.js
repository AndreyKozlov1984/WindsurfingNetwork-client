// @flow
import { connect } from 'react-redux';

import { type State } from '~/store/state';
import { default as ActivityList, type StateProps, type DispatchProps } from '../components/ActivityList';

const mapDispatchToProps: DispatchProps = {};

const mapStateToProps = function (state: State): StateProps {
  return {
    items: state.dashboard.data ? state.dashboard.data.activities : [],
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityList);

