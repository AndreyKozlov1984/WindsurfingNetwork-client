// @flow
import { connect } from 'react-redux';
import { type State } from '~/store/state';
import { type DispatchProps, type StateProps, default as Spot } from '../components/Spot';

const mapDispatchToProps: DispatchProps = {};
const mapStateToProps = (state: State): StateProps => ({
  spot: state.spots.selectedSpot,
});

export default connect(mapStateToProps, mapDispatchToProps)(Spot);

