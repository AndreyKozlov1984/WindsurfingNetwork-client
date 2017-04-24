import { connect } from 'react-redux';

import Spot from '../components/Spot';

const mapDispatchToProps = {};

const mapStateToProps = state => ({
  spot: state.spots.selectedSpot,
});

export default connect(mapStateToProps, mapDispatchToProps)(Spot);

