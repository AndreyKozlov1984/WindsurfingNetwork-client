import { connect } from 'react-redux';
import { setMapPosition, selectMarker } from '../modules/dashboard';
import { createSelector } from 'reselect';

import Map from '../components/Map';

const mapDispatchToProps = {
  onMapChanged: setMapPosition,
  onMarkerClicked: selectMarker,
};

const getMarkers = createSelector([state => state.dashboard.data.mapMarkers], markers =>
  markers.map(function (m) {
    return {
      position: {
        lat: +m.lat,
        lng: +m.lng,
      },
      key: m.id,
    };
  }),
);

const mapStateToProps = function (state) {
  console.info(state.dashboard.map);
  return {
    zoom: state.dashboard.zoom,
    center: state.dashboard.center,
    markers: getMarkers(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);

