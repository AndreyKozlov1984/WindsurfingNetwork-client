import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { globalBus, FIT_BOUNDS } from '~/store/globalBus';
import autobind from 'autobind-decorator';
// import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer';
/* global google */

// TODO: @autobind on fitBounds / onIdle
// @listen on a whole component like
// @listen(FIT_BOUNDS) on a method
class MapComponent extends React.PureComponent {
  static propTypes = {
    zoom: React.PropTypes.number.isRequired,
    center: React.PropTypes.object.isRequired,
    markers: React.PropTypes.array.isRequired,
    onMarkerClicked: React.PropTypes.func.isRequired,
    onMapChanged: React.PropTypes.func.isRequired,
  };
  componentWillMount () {
    globalBus.on(FIT_BOUNDS, this.fitBounds);
  }
  componentWillUnmount () {
    globalBus.off(FIT_BOUNDS, this.fitBounds);
  }
  @autobind fitBounds () {
    let bounds = new google.maps.LatLngBounds();
    for (let point of this.props.markers) {
      bounds.extend(new google.maps.LatLng(point.position.lat, point.position.lng));
    }
    if (this.map) {
      this.map.fitBounds(bounds);
    }
  }
  @autobind onIdle () {
    this.props.onMapChanged({
      center: { lat: this.map.getCenter().lat(), lng: this.map.getCenter().lng() },
      zoom: this.map.getZoom(),
    });
  }
  render () {
    return (
      <GoogleMap
        ref={map => {
          this.map = map;
        }}
        zoom={this.props.zoom}
        center={this.props.center}
        onIdle={this.onIdle}
      >
        {this.props.markers.map(marker => (
          <Marker {...marker} onClick={() => this.props.onMarkerClicked(marker.key)} />
        ))}
      </GoogleMap>
    );
  }
}
export default withGoogleMap(MapComponent);

