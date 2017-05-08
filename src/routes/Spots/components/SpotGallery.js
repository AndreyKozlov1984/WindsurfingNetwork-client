// @flow

import React from 'react';
import { Panel, Breadcrumb, ListGroup, ListGroupItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Gallery from 'react-photo-gallery';
import _ from 'lodash';
import { monthByNumber } from '~/utils/formatters';
import {
  type SpotForGallery as SpotForGalleryType,
  type PhotosByMonth as PhotosByMonthType,
  type Photo as PhotoType,
} from '../modules/spots';

export type DispatchProps = {} & $Exact<{}>;
export type StateProps = {| spot: ?SpotForGalleryType, selectedMonth: ?number |};
type Props = {| ...StateProps, ...DispatchProps |};

type MonthInfo = {|
  id: ?number,
  text: string,
  href: string,
|};

const getMonthInfo = (spot: SpotForGalleryType, selectedMonth: ?number): MonthInfo[] =>
  [
    {
      id: null,
      text: `All Months (${_.flatten(_.values(spot.photos)).length})`,
      href: `/spots/${spot.id}/gallery`,
    },
  ].concat(
    _.range(12).map(function (monthNumber: number) {
      return {
        id: monthNumber,
        text: `${monthByNumber(monthNumber)} (${(spot.photos[monthNumber] || []).length})`,
        href: `/spots/${spot.id}/gallery/${monthNumber}`,
      };
    }),
  );

const SpotGallery = ({ spot, selectedMonth }: Props) => {
  if (!spot) {
    return <div>Loading...</div>;
  }
  const galleryPhoto = (photo: PhotoType) => ({
    width: photo.width,
    height: photo.height,
    src: `/api/usercontent/${photo.photo}`,
  });
  const months: MonthInfo[] = getMonthInfo(spot, selectedMonth);

  const visiblePhotos: PhotosByMonthType = typeof selectedMonth !== 'number'
    ? spot.photos
    : { [selectedMonth]: spot.photos[selectedMonth] || [] };

  return (
    <div className='layout-main' style={{ marginTop: 30 }}>
      <div style={{ position: 'fixed', top: '50px', height: '60px', width: '100%' }}>
        <Breadcrumb>
          <LinkContainer to={`/spots/${spot.id}`}>
            <Breadcrumb.Item>
              {spot.name}
            </Breadcrumb.Item>
          </LinkContainer>
          <LinkContainer to={`/spots/${spot.id}/gallery`}>
            <Breadcrumb.Item>
              Photo Gallery
            </Breadcrumb.Item>
          </LinkContainer>
          {typeof selectedMonth === 'number'
            ? <LinkContainer to={`/spots/${spot.id}/gallery/${selectedMonth}`}>
              <Breadcrumb.Item>
                {monthByNumber(selectedMonth)}
              </Breadcrumb.Item>
            </LinkContainer>
            : ''}
        </Breadcrumb>
      </div>
      <div className='layout-left' style={{ width: 200, margin: '0 10px' }}>
        <Panel header='Photos per month'>
          <ListGroup>
            {months.map((monthInfo: MonthInfo) => (
              <LinkContainer key={monthInfo.id} to={monthInfo.href}>
                <ListGroupItem style={{ outline: 0 }} active={monthInfo.id === selectedMonth}>
                  {monthInfo.text}
                </ListGroupItem>
              </LinkContainer>
            ))}
          </ListGroup>
        </Panel>
      </div>
      <div className='layout-middle'>
        {_.map(visiblePhotos, function (monthPhotos: PhotoType[], month: string) {
          return (
            <Panel key={month} header={monthByNumber(+month)}>
              <Gallery photos={monthPhotos.map(galleryPhoto)} />
            </Panel>
          );
        })}
      </div>
    </div>
  );
};
export default SpotGallery;

