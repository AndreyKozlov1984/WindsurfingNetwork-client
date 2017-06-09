// @flow
import React from 'react';
import _ from 'lodash';
import { type SpotForUsers as SpotForUsersType, type User as UserType } from '../../modules/spotUsers';
import { ListGroupItem, ListGroup, Media } from 'react-bootstrap';
import { List, AutoSizer, InfiniteLoader } from 'react-virtualized';
import { getSpotUsersPage } from '../../modules/api';
import { scrollToUsersBus } from '~/store/globalBus';
export type StateProps = {| spot: SpotForUsersType, search: string |};
export type DispatchProps = {} & $Exact<{}>;
type Props = {| ...StateProps, ...DispatchProps |};
type State = {| list: UserType[] |};

// Note: with infinite loader I need to have a
// Todo: reset it! make a list empty
/* eslint-disable immutable/no-this */
class UsersList extends React.Component {
  props: Props;
  infiniteScroll: ?any;
  list: ?any;
  state: State = {
    list: [],
  };

  componentWillMount () {
    scrollToUsersBus.subscribe(this.reset);
  }
  componentWillUnmount () {
    scrollToUsersBus.unsubscribe(this.reset);
  }
  reset = async () => {
    const { infiniteScroll, list } = this;
    if (infiniteScroll) {
      infiniteScroll.resetLoadMoreRowsCache();
      const data = await getSpotUsersPage({
        id: this.props.spot.id,
        search: this.props.search,
        startIndex: 0,
        stopIndex: 20,
      });
      this.setState({ list: data }, () => {
        infiniteScroll._loadUnloadedRanges([{ startIndex: 0, stopIndex: 20 }]);
      });
    }
    if (list) {
      list.scrollToPosition(0);
    }
  };

  isRowLoaded = ({ index }: { index: number }) => {
    const { list } = this.state;
    return !!list[index];
  };

  loadMoreRows = async ({ startIndex, stopIndex }: { startIndex: number, stopIndex: number }) => {
    const data = await getSpotUsersPage({ id: this.props.spot.id, search: this.props.search, startIndex, stopIndex });
    const list = this.state.list;
    for (var i = 0; i < data.length; i++) {
      list[i + startIndex] = data[i]; // eslint-disable-line immutable/no-mutation
    }
    this.setState({ list: _.clone(list) });
  };

  rowRenderer = ({ index, isScrolling, isVisible, key, parent, style }: any) => {
    const { list } = this.state;
    const user: UserType = list[index];
    if (!user) {
      return (
        <ListGroupItem key={key} style={style}>
          <Media>
            <Media.Left>
              <img width={64} height={64} />
            </Media.Left>
            <Media.Body>
              <Media.Heading />
              <div> Name </div>
            </Media.Body>
          </Media>
        </ListGroupItem>
      );
    }
    return (
      <ListGroupItem key={key} style={style}>
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
    );
  };
  render () {
    return (
      <AutoSizer>
        {({ width, height }: { width: number, height: number }) => (
          <ListGroup>
            <InfiniteLoader
              ref={(x: React$Element<any>) => (this.infiniteScroll = x)} // eslint-disable-line immutable/no-mutation
              minimumBatchSize={100}
              isRowLoaded={this.isRowLoaded}
              loadMoreRows={this.loadMoreRows}
              rowCount={this.props.spot.count}
            >
              {({ onRowsRendered, registerChild }: any) => (
                <List
                  width={width}
                  height={height}
                  ref={(x: any) => {
                    registerChild(x);
                    this.list = x; // eslint-disable-line immutable/no-mutation
                  }}
                  rowCount={this.props.spot.count}
                  onRowsRendered={onRowsRendered}
                  rowHeight={80}
                  rowRenderer={this.rowRenderer}
                />
              )}
            </InfiniteLoader>
          </ListGroup>
        )}
      </AutoSizer>
    );
  }
}
export default UsersList;

