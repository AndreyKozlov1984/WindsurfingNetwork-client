import { connect } from 'react-redux';
import { setMapPosition } from '../modules/dashboard';

import Map from '../components/Map';

const mapDispatchToProps = {
  onMapChanged: setMapPosition,
};

const mapStateToProps = function (state) {
  console.info(state.dashboard.map);
  return {
    zoom: state.dashboard.map.zoom,
    center: state.dashboard.map.center,
    fitBounds: state.dashboard.map.fitBounds,
    markers: state.dashboard.data.mapMarkers.map(function (m) {
      return {
        position: {
          lat: +m.lat,
          lng: +m.lng,
        },
        key: m.id,
      };
    }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);

