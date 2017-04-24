import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
// import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer';
/* global google */

export default withGoogleMap(function ({ zoom, center, fitBounds, onMapChanged, markers }) {
  var map = null;
  const onIdle = function () {
    onMapChanged({
      center: { lat: map.getCenter().lat(), lng: map.getCenter().lng() },
      zoom: map.getZoom(),
    });
  };
  if (fitBounds) {
    setTimeout(
      function () {
        let bounds = new google.maps.LatLngBounds();
        for (let point of markers) {
          console.info(point);
          bounds.extend(new google.maps.LatLng(point.position.lat, point.position.lng));
        }

        if (map) {
          map.fitBounds(bounds);
        }
      },
      1,
    );
  }
  return (
    <GoogleMap
      ref={function (ref) {
        map = ref;
      }}
      zoom={zoom}
      center={center}
      onIdle={onIdle}
    >
      {markers.map(marker => <Marker {...marker} />)}
    </GoogleMap>
  );
});

