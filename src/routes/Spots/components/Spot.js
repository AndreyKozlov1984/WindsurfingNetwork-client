// @flow
import { Grid, Carousel, Col, Panel, Media, Tabs, Tab, Button } from 'react-bootstrap';
import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';
import _ from 'lodash';
import { centerStyles } from '~/utils/formatters';
import SpotConditions from './SpotConditions';
import SpotMonthlyDistribution from './SpotMonthlyDistribution';
import {
  type Spot as SpotType,
  type SimpleSchool as SimpleSchoolType,
  type SimpleUser as SimpleUserType,
} from '../modules/spots';

export type DispatchProps = {} & $Exact<{}>;
export type StateProps = {|
  spot: ?SpotType,
  canEdit: boolean,
|};
export type Props = {| ...StateProps, ...DispatchProps |};

const Map = withGoogleMap(({ spot }: { spot: SpotType }): React$Element<any> => (
  <GoogleMap options={{ scrollwheel: false }} zoom={12} center={{ lat: spot.lat, lng: spot.lng }}>
    <Marker position={{ lat: spot.lat, lng: spot.lng }} key='point' />
  </GoogleMap>
));

const activities: { [string]: string } = {
  sailing: 'Sailing',
  surfing: 'Surfing',
  snowkiting: 'Snow Kiting',
  kitesurfing: 'Kite Surfing',
  windsurfing: 'Wind Surfing',
};

const MonthsAvailability = ({ spot }: { spot: SpotType }) => (
  <Tabs defaultActiveKey={0}>
    {_.map(_.keys(activities), function (key: string, index: number) {
      const value = activities[key];
      return (
        <Tab eventKey={index} title={value}>
          <SpotMonthlyDistribution distribution={spot.monthly_distribution[key]} />
        </Tab>
      );
    })}
  </Tabs>
);

const Spot = ({ spot, canEdit }: Props) => {
  if (!spot) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{ overflowY: 'auto', height: 'calc(100% - 70px)' }}>
      <Grid>
        <Col md={9}>
          <Panel>
            <Media>
              <Media.Left>
                <img width={64} height={64} src={`/api/usercontent/${spot.logo}`} />
              </Media.Left>
              <Media.Body>
                <Media.Heading>{spot.name}</Media.Heading>
                {spot.country}, {spot.region}
                <div>
                  <b> Rating: </b> {spot.rating}

                </div>
              </Media.Body>
              {canEdit &&
                <Media.Right>
                  <LinkContainer to={`/spots/${spot.id}/edit`}><Button>Edit</Button></LinkContainer>
                </Media.Right>}
            </Media>
            <Col md={4}>
              <h4> Conditions </h4>
              <SpotConditions spot={spot} />
            </Col>
            <Col md={8}>
              <MonthsAvailability spot={spot} />
            </Col>

          </Panel>
          <div className='panel panel-default'>
            <div className='panel-heading'>
              <Link to={`/spots/${spot.id}/gallery`}>{`Photos (${spot.photos.length})`}</Link>
            </div>
            <div className='panel-body'>
              <Carousel indicators={false} interval={100400}>
                {spot.photos.slice(0, 10).map(function (photo: string, index: number) {
                  return (
                    <Carousel.Item key={index} style={{ height: '300px' }}>
                      <div
                        className='photo'
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundImage: `url("/api/usercontent/${photo}") `,
                        }}
                      />
                    </Carousel.Item>
                  );
                })}

                {spot.photos.length > 10
                  ? <Carousel.Item style={{ height: '300px' }}>
                      <Link to={`/spots/${spot.id}/gallery`}>
                        <h2 style={{ ...centerStyles }}>
                          View {spot.photos.length - 10} remaining photos
                        </h2>
                      </Link>
                    </Carousel.Item>
                  : ''}
              </Carousel>

            </div>

          </div>

        </Col>
        <Col md={3}>
          <Map
            containerElement={<div style={{ height: '200px' }} />}
            mapElement={<div style={{ height: `100%` }} />}
            spot={spot}
          />
          <br />
          <div className='panel panel-default'>
            <div className='panel-heading'>
              <Link to={`/spots/${spot.id}/schools`}>Schools ({spot.schools.length})</Link>
            </div>
            <div className='panel-body'>
              {spot.schools.map(function (school: SimpleSchoolType) {
                return (
                  <Media key={school.id}>
                    <Media.Left>
                      <img width={64} height={64} src={`/api/usercontent/${school.logo}`} />
                    </Media.Left>
                    <Media.Body>
                      <Media.Heading><Link to={`/schools/${school.id}`}>{school.name}</Link></Media.Heading>
                      <p>Windsurfing, Kitesurfing</p>
                    </Media.Body>
                  </Media>
                );
              })}
            </div>
          </div>

          <div className='panel panel-default'>
            <div className='panel-heading'>
              <Link to={`/spots/${spot.id}/users`}>Users ({spot.users.length})</Link>
            </div>
            <div className='panel-body'>
              {spot.users
                .slice(0, 10)
                .map((user: SimpleUserType) => (
                  <img
                    key={user.id}
                    style={{ position: 'inline-block', width: 90, height: 90, margin: 10 }}
                    src={`/api/usercontent/${user.logo}`}
                  />
                ))}
              {spot.users.length > 10
                ? <Link to={`/spots/${spot.id}/users`}>
                    <h4 style={{ textAlign: 'center' }}>
                      <Link to={`/spots/${spot.id}/users`}>View {spot.users.length - 10} more users</Link>
                    </h4>
                  </Link>
                : ''}
            </div>
          </div>
        </Col>
      </Grid>
    </div>
  );
};

export default Spot;

