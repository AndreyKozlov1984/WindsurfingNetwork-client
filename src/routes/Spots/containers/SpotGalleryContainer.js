import { connect } from 'react-redux';

import SpotGallery from '../components/SpotGallery';
import { selectMonth } from '../modules/spots.js';

const mapDispatchToProps = {
  onSelectMonth: selectMonth,
};

const mapStateToProps = state => ({
  spot: state.spots.selectedGallery,
  selectedMonth: state.spots.selectedMonth,
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotGallery);

