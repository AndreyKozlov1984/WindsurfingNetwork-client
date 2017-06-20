// @flow
import React from 'react';
import Spot from './Spot';
import { ListGroup, Media, ListGroupItem } from 'react-bootstrap';
import { List, InfiniteLoader, AutoSizer } from 'react-virtualized';
import { type Spot as SpotType, type Filters } from '../modules/dashboard';
import { getSpotsPage } from '../modules/api';
import { scrollToSpotBus } from '~/store/globalBus';
import _ from 'lodash';

export type StateProps = {|
  count: number,
  filters: Filters,
  selectedItemId: ?number,
|};
export type DispatchProps = {|
  onSelectItem: Function,
|};
type State = {| list: SpotType[], top: number |};
export type Props = {| ...StateProps, ...DispatchProps |};

/* eslint-disable immutable/no-this */
class SpotList extends React.Component {
  props: Props;
  infiniteScroll: ?any;
  list: ?any;
  state: State = {
    list: [],
    top: 0,
  };

  componentWillMount () {
    scrollToSpotBus.subscribe(this.scroll);
  }
  componentWillUnmount () {
    scrollToSpotBus.unsubscribe(this.scroll);
  }

  updateList = ({ list, startIndex, data }: { list: SpotType[], startIndex: number, data: SpotType[] }) => {
    const newList = _.clone(list);
    for (var i = 0; i < data.length; i++) {
      newList[i + startIndex] = data[i]; // eslint-disable-line immutable/no-mutation
    }
    return newList;
  };

  scroll = async ({ index }: { index: number }) => {
    const { infiniteScroll } = this;
    if (infiniteScroll) {
      infiniteScroll.resetLoadMoreRowsCache();
      const data = await getSpotsPage({
        filters: this.props.filters,
        startIndex: index,
        stopIndex: index + 20,
      });
      const newList = this.updateList({ list: this.state.list, startIndex: index, data: data });
      this.setState(
        {
          list: newList,
          top: index,
        },
        () => {
          infiniteScroll._loadUnloadedRanges([{ startIndex: index + 0, stopIndex: index + 20 }]);
        },
      );
    }
  };

  isRowLoaded = ({ index }: { index: number }) => {
    const { list } = this.state;
    return !!list[index];
  };

  loadMoreRows = async ({ startIndex, stopIndex }: { startIndex: number, stopIndex: number }) => {
    console.info(startIndex);
    const data = await getSpotsPage({ filters: this.props.filters, startIndex, stopIndex });
    const newList = this.updateList({ list: this.state.list, startIndex: startIndex, data: data });
    this.setState({ list: newList });
  };

  rowRenderer = ({ index, isScrolling, isVisible, key, parent, style }: any) => {
    const { list } = this.state;
    const spot: SpotType = list[index];
    if (!spot) {
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
      <ListGroupItem
        key={key}
        style={style}
        active={spot.id === this.props.selectedItemId}
        onClick={() => this.props.onSelectItem(spot.id)}
      >
        <Spot {...spot} useLinks={spot.id === this.props.selectedItemId} />
      </ListGroupItem>
    );
  };

  render () {
    window.setInterval(() => this.list && this.list.forceUpdateGrid(), 1);
    return (
      <AutoSizer>
        {({ width, height }: { width: number, height: number }) => (
          <ListGroup>
            <InfiniteLoader
              ref={(x: React$Element<any>) => (this.infiniteScroll = x)} // eslint-disable-line immutable/no-mutation
              minimumBatchSize={100}
              isRowLoaded={this.isRowLoaded}
              loadMoreRows={this.loadMoreRows}
              rowCount={this.props.count}
            >
              {({ onRowsRendered, registerChild }: any) => (
                <List
                  width={width}
                  height={height}
                  ref={(x: any) => {
                    registerChild(x);
                    this.list = x; // eslint-disable-line immutable/no-mutation
                  }}
                  rowCount={this.props.count}
                  rowRenderer={this.rowRenderer}
                  onRowsRendered={onRowsRendered}
                  rowHeight={80}
                  scrollToIndex={this.state.top}
                  scrollToAlignment='start'
                />
              )}
            </InfiniteLoader>
          </ListGroup>
        )}
      </AutoSizer>
    );
  }
}

export default SpotList;

