// @flow
import { connect } from 'react-redux';
import { selectMarker, type MapMarker } from '../modules/dashboard';
import { type State } from '~/store/state';
import { createSelector } from 'reselect';

import { default as Map, type MapMarkerProps, type StateProps, type DispatchProps } from '../components/Map';

const mapDispatchToProps: DispatchProps = {
  onMarkerClicked: selectMarker,
};

const getMarkers = createSelector(
  [
    (state: State) => (state.dashboard.data ? state.dashboard.data.mapMarkers : []),
    (state: State) => state.dashboard.selectedItemId,
  ],
  (markers: MapMarker[], selectedItemId: ?number) =>
    markers
      .map(function (m: MapMarker): MapMarkerProps {
        return {
          position: {
            lat: m.lat,
            lng: m.lng,
          },
          key: m.id,
        };
      })
      .filter(function (m: MapMarkerProps) {
        return m.key !== selectedItemId;
      }),
);

const getSelectedMarker = createSelector(
  [
    (state: State) => (state.dashboard.data ? state.dashboard.data.mapMarkers : []),
    (state: State) => state.dashboard.selectedItemId,
  ],
  (markers: MapMarker[], selectedItemId: ?number) =>
    markers
      .map(function (m: MapMarker): MapMarkerProps {
        return {
          position: {
            lat: m.lat,
            lng: m.lng,
          },
          key: m.id,
        };
      })
      .filter(function (m: MapMarkerProps) {
        return m.key === selectedItemId;
      })[0],
);

const mapStateToProps = function (state: State): StateProps {
  return {
    markers: getMarkers(state),
    selectedMarker: getSelectedMarker(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);

