// @flow
import React from 'react';
import { Breadcrumb, Panel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { type SpotForUsers as SpotForUsersType } from '../../modules/spotUsers';
export type StateProps = {| spot: ?SpotForUsersType, search: string |};
export type DispatchProps = {} & $Exact<{}>;
type Props = {| ...StateProps, ...DispatchProps |};
import UsersList from './UsersList';
import SearchFieldContainer from '../../containers/SearchFieldContainer';

// Note: with infinite loader I need to have a
// 1) [x] Total number of rows
// 2) [ ] Storage for loaded rows (even MRU for most effective memory usage!)
// 3) [ ] If I add filtering(say, user name), I need a way to scroll to the top and reset everything
// Ideas about what I store in the reducer state:
// a) filters.
// b) when filters are changed, I send a 'reset' command, so the cache is
// cleared and grid is scrolled to the top
// state - only filters and totalCount. Raws are fetched via api
/* eslint-disable immutable/no-this */
class SpotUsers extends React.Component {
  props: Props;
  render () {
    const { spot, search } = this.props;
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
        <div className='layout-left'>
          <Panel header='Filters'>
            <SearchFieldContainer />
          </Panel>
        </div>
        <div className='layout-middle'>
          <UsersList spot={spot} search={search} />
        </div>
      </div>
    );
  }
}
export default SpotUsers;

