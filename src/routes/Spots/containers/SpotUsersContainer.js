import { connect } from 'react-redux';

import SpotUsers from '../components/SpotUsers';

const mapDispatchToProps = {};

const mapStateToProps = state => ({
  spot: state.spots.selectedUsers,
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotUsers);

