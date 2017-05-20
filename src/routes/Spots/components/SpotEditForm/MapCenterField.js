// @flow
import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
type MapProps = {
  lat: number,
  lng: number,
  onMove: (position: { lat: number, lng: number }) => any,
};

const Map = withGoogleMap(({ lat, lng, onMove }: MapProps): React$Element<any> => {
  return (
    <GoogleMap
      zoom={6}
      center={{ lat: lat, lng: lng }}
      options={{ scrollwheel: false }}
      onClick={(e: any) => onMove({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
    >
      <Marker position={{ lat: lat, lng: lng }} key='point' />
    </GoogleMap>
  );
});

export const MapCenterField = (fields: any) => (
  <Map
    containerElement={<div style={{ height: '200px' }} />}
    mapElement={<div style={{ height: `100%` }} />}
    lat={+fields.lat.input.value}
    lng={+fields.lng.input.value}
    onMove={function ({ lat, lng }: { lat: number, lng: number }) {
      fields.lat.input.onChange(lat);
      fields.lng.input.onChange(lng);
    }}
  />
);

