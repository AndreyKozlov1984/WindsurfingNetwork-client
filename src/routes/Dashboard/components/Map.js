// @flow
import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { fitBoundsBus, type FitBoundsPayload } from '~/store/globalBus';
// import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer';
declare var google: any;

export type StateProps = {|
  zoom: number,
  center: {| lat: number, lng: number |},
  markers: MapMarkerProps[],
|};
export type DispatchProps = {|
  onMarkerClicked: Function,
  onMapChanged: Function,
|};
export type MapMarkerProps = {|
  position: {|
    lat: number,
    lng: number,
  |},
  key: number,
|};
class MapComponent extends React.PureComponent {
  map: any;
  props: {|...DispatchProps, ... StateProps|};
  componentWillMount () {
    fitBoundsBus.subscribe(this.fitBounds);
  }
  componentWillUnmount () {
    fitBoundsBus.unsubscribe(this.fitBounds);
  }
  fitBounds = (payload: FitBoundsPayload) => {
    let bounds = new google.maps.LatLngBounds();
    for (let point of this.props.markers) {
      bounds.extend(new google.maps.LatLng(point.position.lat, point.position.lng));
    }
    if (this.map) {
      this.map.fitBounds(bounds);
    }
  }
  onIdle = () => {
    this.props.onMapChanged({
      center: { lat: this.map.getCenter().lat(), lng: this.map.getCenter().lng() },
      zoom: this.map.getZoom(),
    });
  }
  render () {
    return (
      <GoogleMap
        ref={(map: any) => {
          this.map = map;
        }}
        zoom={this.props.zoom}
        center={this.props.center}
        onIdle={this.onIdle}
      >
        {this.props.markers.map((marker: MapMarkerProps) => (
          <Marker {...marker} onClick={() => this.props.onMarkerClicked(marker.key)} />
        ))}
      </GoogleMap>
    );
  }
}
export default withGoogleMap(MapComponent);

