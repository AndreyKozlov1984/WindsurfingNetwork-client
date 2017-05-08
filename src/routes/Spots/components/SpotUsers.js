// @flow
import React from 'react';
import { Breadcrumb, Media, ListGroup, ListGroupItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { type SpotForUsers as SpotForUsersType, type User as UserType } from '../modules/spots';
export type StateProps = {| spot: ?SpotForUsersType |};
export type DispatchProps = {} & $Exact<{}>;
type Props = {| ...StateProps, ...DispatchProps |};
const SpotUsers = ({ spot }: Props) => {
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
          {spot.users.map((user: UserType) => (
            <ListGroupItem key={user.id}>
              <Media>
                <Media.Left>
                  <img width={64} height={64} src={`/api/usercontent/${user.logo}`} />
                </Media.Left>
                <Media.Body>
                  <Media.Heading>{user.name}</Media.Heading>
                  <div>{[user.country, user.city].filter((x: ?string) => x).join(', ')}</div>
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
export default SpotUsers;

