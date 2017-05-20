// @flow
import { connect } from 'react-redux';
import { type State } from '~/store/state';
import { submit, cancel, rotateLeft, rotateRight } from '../modules/spotEdit';
import { type DispatchProps, type StateProps, default as SpotEdit } from '../components/SpotEdit';

const mapDispatchToProps: DispatchProps = {
  onSubmit: submit,
  onCancel: cancel,
  onRotateLeft: rotateLeft,
  onRotateRight: rotateRight,
};
const mapStateToProps = (state: State): StateProps => ({
  form: state.spotEdit.form,
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotEdit);

