// @flow
import React from 'react';
import { Media } from 'react-bootstrap';
import { Link } from 'react-router';
import { type Spot as SpotType } from '../modules/dashboard';

export type PropsType = {| ...SpotType, useLinks: boolean |};

const Spot = ({
  useLinks,
  logo,
  name,
  id,
  region,
  country,
  users_count: usersCount,
  schools_count: schoolsCount,
  photos_count: photosCount,
}: PropsType) => (
  <div>
    <Media>
      <Media.Left align='top'>
        <img width={64} height={64} src={`/api/usercontent/${logo}`} alt={name} />
      </Media.Left>
      <Media.Body>
        <Media.Heading>
          {useLinks
            ? <Link to={`/spots/${id}`}>
                {name}
              </Link>
            : <span>{name}</span>}
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
  </div>
);

export default Spot;

