// @flow
import React from 'react';
import Spot from './Spot';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { type Spot as SpotType } from '../modules/dashboard';

export type StateProps = {|
  items: SpotType[], selectedItemId: ?number,
|};
export type DispatchProps = {|
 onSelectItem: Function,
|};
export type Props = {| ...StateProps, ...DispatchProps |};

const SpotList = ({
  items,
  selectedItemId,
  onSelectItem,
}: Props) => {
  return (
    <Panel header={`Spots List (${items.length})`}>
      <ListGroup>
        {items.map((item: SpotType) => (
          <ListGroupItem key={item.id} active={item.id === selectedItemId} onClick={() => onSelectItem(item.id)}>
            <Spot {...item} useLinks={item.id === selectedItemId} />
          </ListGroupItem>
        ))}
      </ListGroup>
    </Panel>
  );
};

export default SpotList;

