// @flow
import { connect } from 'react-redux';
import { type State } from '~/store/state';

import { default as SpotSchools, type StateProps, type DispatchProps } from '../components/SpotSchools';

const mapDispatchToProps: DispatchProps = {};

const mapStateToProps = (state: State): StateProps => ({
  spot: state.spots.selectedSchools,
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotSchools);

