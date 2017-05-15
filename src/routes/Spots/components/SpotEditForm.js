// @flow
import _ from 'lodash';
import React from 'react';
import { Field, Fields, FormSection, reduxForm } from 'redux-form';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { mapConditions } from '~/enums/conditions';
import {
  Checkbox,
  Button,
  Col,
  Row,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Tab,
  Tabs,
} from 'react-bootstrap';
import SpotMonthlyDistributionField from './SpotMonthlyDistributionField';

const notBlank = function (x: string): ?string {
  if (!x) {
    return 'Required';
  }
};
const isLat = function (x: string): ?string {
  if (!/^(-|\+)?([0-9]+(\.[0-9]+)?)$/.test(x)) {
    return 'Is not a number';
  }
  const number = parseFloat(x);
  if (number < -90) {
    return 'Should be between -90 at 90';
  }
  if (number > 90) {
    return 'Should be between -90 at 90';
  }
};

const isLng = function (x: string): ?string {
  if (!/^(-|\+)?([0-9]+(\.[0-9]+)?)$/.test(x)) {
    return 'Is not a number';
  }
  const number = parseFloat(x);
  if (number < -180) {
    return 'Should be between -90 at 90';
  }
  if (number > 180) {
    return 'Should be between -90 at 90';
  }
};

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
      onClick={(e: any) => onMove({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
    >
      <Marker position={{ lat: lat, lng: lng }} key='point' />
    </GoogleMap>
  );
});

const renderMapCenter = (fields: any) => (
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

const renderField = ({ input, label, meta }: { input: any, label: string, meta: any }): React$Element<any> => (
  <FormGroup controlId='formBasicText' validationState={meta.touched ? meta.error ? 'error' : 'success' : null}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...input} value={input.value} placeholder='Enter text' />
    <FormControl.Feedback />
    {meta.touched && meta.error && <HelpBlock>{meta.error}</HelpBlock>}
  </FormGroup>
);
const renderCheckbox = ({ input, label, meta }: { input: any, label: string, meta: any }): React$Element<any> => {
  return (
    <Checkbox {...input} checked={!!input.value} inline>
      {label}
    </Checkbox>
  );
};

const activities: { [string]: string } = {
  sailing: 'Sailing',
  surfing: 'Surfing',
  snowkiting: 'Snow Kiting',
  kitesurfing: 'Kite Surfing',
  windsurfing: 'Wind Surfing',
};

type Props = {
  handleSubmit: Function,
  onCancel: Function,
  reset: Function,
  submitting: boolean,
  error: ?string,
};

const SimpleForm = (props: Props) => {
  const { handleSubmit, onCancel, error, submitting } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Field label='Spot' name='name' validate={[notBlank]} component={renderField} type='text' />
      <Field label='Country' name='country' component={renderField} type='text' />
      <Field label='Region' name='region' component={renderField} type='text' />
      <Field label='Rating' name='rating' component={renderField} type='number' min={0} max={10000} />
      <Row>
        <FormGroup>
          <Col sm={6}>
            <Field label='Latitude' name='lat' validate={[isLat]} component={renderField} type='text' />
            <Field label='Longitude' name='lng' validate={[isLng]} component={renderField} type='text' />
          </Col>
          <Col sm={6}>
            <Fields names={['lat', 'lng']} component={renderMapCenter} />
          </Col>
        </FormGroup>
      </Row>
      <Row>
        <Tabs defaultActiveKey='sailing'>
          {_.map(activities, (title: string, activity: string) => (
            <Tab eventKey={activity} title={title}>
              <ControlLabel>Click to change</ControlLabel>
              <Field name={`monthly_distribution.${activity}`} component={SpotMonthlyDistributionField} />
            </Tab>
          ))}
        </Tabs>
      </Row>

      {mapConditions(
        ({ name, label, labels }: { name: string, label: string, labels: { [string]: string } }, index: number) => (
          <FormSection name={`${name}_type`}>
            <FormGroup>
              <h4>{label}</h4>
              {_.map(labels, (label: string, key: string) => (
                <Field label={label} name={key} normalize={(x: string) => !!x} component={renderCheckbox} />
              ))}
            </FormGroup>
          </FormSection>
        ),
      )}

      {error && <p style={{ color: 'red', fontSize: 20, textAlign: 'center' }}>{error}</p>}
      <FormGroup>
        <Button type='submit' bsStyle='primary' bsSize='large' disabled={submitting}>Save</Button>
        &nbsp;
        <Button pullRight type='button' bsSize='large' disabled={submitting} onClick={onCancel}>
          Cancel
        </Button>
      </FormGroup>
    </Form>
  );
};

export default reduxForm({ form: 'spot' })(SimpleForm);

