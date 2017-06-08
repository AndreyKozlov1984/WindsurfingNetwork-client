// @flow
import { connect } from 'react-redux';
import { type State } from '~/store/state';

import { default as SpotUsers, type StateProps, type DispatchProps } from '../components/SpotUsers';

const mapDispatchToProps: DispatchProps = {};

const mapStateToProps = (state: State): StateProps => ({
  spot: state.spotUsers.selectedUsers,
  search: state.spotUsers.search,
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotUsers);

