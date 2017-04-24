import React from 'react';
import { Media } from 'react-bootstrap';
import { Link } from 'react-router';

const Spot = ({ name, country, region, logo, usersCount, schoolsCount, photosCount, id }) => (
  <Media>
    <Media.Left align='top'>
      <img width={64} height={64} src={`/api/usercontent/${logo}`} alt={name} />
    </Media.Left>
    <Media.Body>
      <Media.Heading>
        <Link to={`/spots/${id}`}>
          {name}
        </Link>
      </Media.Heading>
      {country}, {region}<br />
      <span>People: </span>
      <span>{usersCount}</span>
      <span>Schools:</span>
      <span>{schoolsCount}</span>
      <span>Photos: </span>
      <span>{photosCount}</span>
    </Media.Body>
  </Media>
);

Spot.propTypes = {
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  country: React.PropTypes.string.isRequired,
  region: React.PropTypes.string.isRequired,
  logo: React.PropTypes.string.isRequired,
  usersCount: React.PropTypes.number.isRequired,
  schoolsCount: React.PropTypes.number.isRequired,
  photosCount: React.PropTypes.number.isRequired,
};

export default Spot;

