import { connect } from 'react-redux';

import ActivityList from '../components/ActivityList';

const mapDispatchToProps = {};

const mapStateToProps = function (state) {
  return {
    items: state.dashboard.data.activities,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityList);

