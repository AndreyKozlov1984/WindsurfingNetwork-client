// @flow
import { connect } from 'react-redux';

import { Login, type StateProps, type DispatchProps } from '../components/Login';
import { type State } from '~/store/state';
import { push } from 'react-router-redux';

const mapDispatchToProps: DispatchProps = {
  onSuccess: () => push('/'),
};

const mapStateToProps = (state: State): StateProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

