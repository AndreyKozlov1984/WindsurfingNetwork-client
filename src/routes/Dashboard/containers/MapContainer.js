// @flow
import { connect } from 'react-redux';
import { setMapPosition, selectMarker, type MapMarker } from '../modules/dashboard';
import { type State } from '~/store/state';
import { createSelector } from 'reselect';

import { default as Map, type MapMarkerProps, type StateProps, type DispatchProps } from '../components/Map';

const mapDispatchToProps: DispatchProps = {
  onMapChanged: setMapPosition,
  onMarkerClicked: selectMarker,
};

const getMarkers = createSelector([(state: State) => state.dashboard.data.mapMarkers], (markers: MapMarker[]) =>
  markers.map(function (m: MapMarker): MapMarkerProps {
    return {
      position: {
        lat: m.lat,
        lng: m.lng,
      },
      key: m.id,
    };
  }),
);

const mapStateToProps = function (state: State): StateProps {
  return {
    zoom: state.dashboard.zoom,
    center: state.dashboard.center,
    markers: getMarkers(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);

