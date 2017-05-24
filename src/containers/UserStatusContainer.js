// @flow
import { connect } from 'react-redux';

import { UserStatus, type StateProps, type DispatchProps } from '../components/Header/UserStatus';
import { type State } from '~/store/state';

const mapDispatchToProps: DispatchProps = {};
const mapStateToProps = (state: State): StateProps => ({
  user: state.auth.get('user').toJS(),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserStatus);

