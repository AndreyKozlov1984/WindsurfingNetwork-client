import React from 'react';
import { Breadcrumb, Media, ListGroup, ListGroupItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const SpotGallery = ({ spot }) => {
  if (!spot) {
    return <div>Loading...</div>;
  }

  return (
    <div className='layout-main' style={{ marginTop: 30 }}>
      <div style={{ position: 'fixed', top: '50px', height: '60px', width: '100%' }}>
        <Breadcrumb>
          <LinkContainer to={`/spots/${spot.id}`}>
            <Breadcrumb.Item>
              {spot.name}
            </Breadcrumb.Item>
          </LinkContainer>
          <LinkContainer to={`/spots/${spot.id}/users`}>
            <Breadcrumb.Item>
              Users
            </Breadcrumb.Item>
          </LinkContainer>
        </Breadcrumb>
      </div>
      <div className='layout-middle'>
        <ListGroup>
          {spot.users.map(user => (
            <ListGroupItem>
              <Media>
                <Media.Left>
                  <img width={64} height={64} src={`/api/usercontent/${user.logo}`} />
                </Media.Left>
                <Media.Body>
                  <Media.Heading>{user.name}</Media.Heading>
                  <div>{[user.country, user.city].filter(x => x).join(', ')}</div>
                  <span>Rating: </span><span> {user.rating}</span>&nbsp;
                  <span>Photos: </span><span>{user.photos_count} </span>&nbsp;
                </Media.Body>
              </Media>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};
SpotGallery.propTypes = {
  spot: React.PropTypes.object,
};
export default SpotGallery;

