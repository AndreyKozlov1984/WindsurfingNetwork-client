// @flow
import React from 'react';
import Spot from './Spot';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { List, AutoSizer } from 'react-virtualized';
import { type Spot as SpotType, type Filters } from '../modules/dashboard';
import { scrollToSpotBus } from '~/store/globalBus';

export type StateProps = {|
  items: SpotType[],
  filters: Filters,
  selectedItemId: ?number,
|};
export type DispatchProps = {|
  onSelectItem: Function,
|};
type State = {| top: number |};
export type Props = {| ...StateProps, ...DispatchProps |};

/* eslint-disable immutable/no-this */
class SpotList extends React.Component {
  props: Props;
  list: ?any;
  state: State = {
    top: 0,
  };

  componentWillMount () {
    scrollToSpotBus.subscribe(this.scroll);
  }
  componentWillUnmount () {
    scrollToSpotBus.unsubscribe(this.scroll);
  }

  scroll = async ({ index }: { index: number }) => {
    this.setState({ top: index });
  };

  rowRenderer = ({ index, isScrolling, isVisible, key, parent, style }: any) => {
    const spot: SpotType = this.props.items[index];
    return (
      <ListGroupItem
        key={key}
        style={style}
        active={spot.id === this.props.selectedItemId}
        onClick={() => this.props.onSelectItem(spot.id)}
      >
        <span>{index}</span>
        <Spot {...spot} useLinks={spot.id === this.props.selectedItemId} />
      </ListGroupItem>
    );
  };

  render () {
    setTimeout(() => {
      if (this.list) {
        this.list.forceUpdateGrid();
      }
    }, 1);
    return (
      <AutoSizer>
        {({ width, height }: { width: number, height: number }) => (
          <ListGroup>
            <List
              width={width}
              height={height}
              ref={(x: any) => {
                this.list = x; // eslint-disable-line immutable/no-mutation
              }}
              rowCount={this.props.items.length}
              rowHeight={80}
              rowRenderer={this.rowRenderer}
              scrollToIndex={this.state.top}
              scrollToAlignment='start'
            />
          </ListGroup>
        )}
      </AutoSizer>
    );
  }
}

export default SpotList;

