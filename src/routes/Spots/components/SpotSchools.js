// @flow
import React from 'react';
import { Breadcrumb, Media, ListGroup, ListGroupItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { type SpotForSchools as SpotForSchoolsType, type School as SchoolType } from '../modules/spots';
export type StateProps = {| spot: ?SpotForSchoolsType |};
export type DispatchProps = {} & $Exact<{}>;
type Props = {| ...StateProps, ...DispatchProps |};
const SpotSchools = ({ spot }: Props) => {
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
          <LinkContainer to={`/spots/${spot.id}/schools`}>
            <Breadcrumb.Item>
              Schools
            </Breadcrumb.Item>
          </LinkContainer>
        </Breadcrumb>
      </div>
      <div className='layout-middle'>
        <ListGroup>
          {spot.schools.map((school: SchoolType) => (
            <ListGroupItem key={school.id}>
              <Media>
                <Media.Left>
                  <img width={64} height={64} src={`/api/usercontent/${school.logo}`} />
                </Media.Left>
                <Media.Body>
                  <div style={{ display: 'inline-block', width: 200, 'vertical-align': 'top' }}>
                    <Media.Heading>{school.name}</Media.Heading>
                    <div>{school.website ? <a href={`http://${school.website}`}>{school.website}</a> : null}</div>
                    <span>Photos: </span><span>{school.photos_count} </span>&nbsp;
                  </div>
                  <div style={{ display: 'inline-block', width: 600, minHeight: 100, overflowY: 'hidden' }}>
                    <p>{school.description}</p>
                  </div>
                </Media.Body>
                <div style={{ display: 'block', maxHeight: 110, width: 900, overflow: 'hidden' }}>
                  {school.photos.map((photo: string, index: number) => (
                    <div
                      key={index}
                      className='photo'
                      style={{
                        backgroundImage: `url("/api/usercontent/${photo}") `,
                        display: 'inline-block',
                        borderRadius: 5,
                        width: 100,
                        height: 100,
                        margin: 5,
                      }}
                    />
                  ))}
                </div>
              </Media>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};
export default SpotSchools;

