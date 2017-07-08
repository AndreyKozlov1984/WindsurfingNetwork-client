// @flow
import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { fitBoundsBus, type FitBoundsPayload, setCenterBus, type SetCenterPayload } from '~/store/globalBus';
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer';
declare var google: any;

export type StateProps = {|
  markers: MapMarkerProps[],
  selectedMarker: ?MapMarkerProps,
|};
export type DispatchProps = {|
  onMarkerClicked: Function,
|};
export type MapMarkerProps = {|
  position: {|
    lat: number,
    lng: number,
  |},
  key: number,
|};
const mapStyles = [
  {
    featureType: 'landscape',
    stylers: [
      {
        color: '#dec94f',
      },
      {
        saturation: -25,
      },
    ],
  },
  {
    featureType: 'water',
    stylers: [
      {
        color: '#385c62',
      },
      {
        saturation: -50,
      },
    ],
  },
];
/* eslint-disable immutable/no-this */
class MapComponent extends React.PureComponent {
  map: any;
  gmap: any;
  props: {| ...DispatchProps, ...StateProps |};
  componentWillMount () {
    fitBoundsBus.subscribe(this.fitBounds);
    setCenterBus.subscribe(this.setCenter);
  }
  componentWillUnmount () {
    fitBoundsBus.unsubscribe(this.fitBounds);
    setCenterBus.unsubscribe(this.setCenter);
  }
  fitBounds = (payload: FitBoundsPayload) => {
    const bounds = new google.maps.LatLngBounds();
    this.props.markers.forEach(function (point: MapMarkerProps) {
      bounds.extend(new google.maps.LatLng(point.position.lat, point.position.lng));
    });
    if (this.map) {
      this.map.fitBounds(bounds);
    }
  };
  setCenter = (payload: SetCenterPayload) => {
    if (this.map) {
      this.gmap.setCenter(new google.maps.LatLng(payload.lat, payload.lng));
      this.gmap.setZoom(this.map.getZoom() < 12 ? 12 : this.map.getZoom());
    }
  };
  render () {
    const assignMap = (gmap: any) => {
      this.gmap = gmap; // eslint-disable-line immutable/no-mutation
    };
    return (
      <GoogleMap
        ref={(map: any) => {
          this.map = map; // eslint-disable-line immutable/no-mutation
        }}
        onIdle={function (gmap: any) {
          console.info('gmap: ', this);
          assignMap(this);
        }}
        defaultOptions={{ styles: mapStyles }}
        defaultZoom={5}
        defaultCenter={{ lat: 23, lng: 23 }}
      >
        <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
          {this.props.markers.map((marker: MapMarkerProps) => (
            <Marker {...marker} key={marker.key} onClick={() => this.props.onMarkerClicked(marker.key)} zIndex={100} />
          ))}
        </MarkerClusterer>
        {this.props.selectedMarker &&
          <Marker
            {...this.props.selectedMarker}
            key={this.props.selectedMarker.key}
            zIndex={10000}
            onClick={() => this.props.onMarkerClicked(this.props.selectedMarker && this.props.selectedMarker.key)}
          />}
      </GoogleMap>
    );
  }
}
/* eslint-enable immutables/no-this */
export default withGoogleMap(MapComponent);

