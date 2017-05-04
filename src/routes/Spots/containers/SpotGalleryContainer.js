// @flow
import { connect } from 'react-redux';
import { type State } from '~/store/state';

import { default as SpotGallery, type DispatchProps, type StateProps } from '../components/SpotGallery';

const mapDispatchToProps: DispatchProps = {};

const mapStateToProps = (state: State): StateProps => ({
  spot: state.spots.selectedGallery,
  selectedMonth: state.spots.selectedMonth,
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotGallery);

