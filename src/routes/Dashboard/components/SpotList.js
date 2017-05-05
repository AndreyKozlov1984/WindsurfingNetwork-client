import React from 'react';
import Spot from './Spot';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

const SpotList = ({ items, selectedItemId, scrollToSelected, onSelectItem }) => {
  return (
    <Panel header={`Spots List (${items.length})`}>
      <ListGroup>
        {items.map(item => (
          <ListGroupItem key={item.id} active={item.id === selectedItemId} onClick={() => onSelectItem(item.id)}>
            <Spot {...item} useLinks={item.id === selectedItemId} />
          </ListGroupItem>
        ))}
      </ListGroup>
    </Panel>
  );
};

SpotList.propTypes = {
  items: React.PropTypes.array.isRequired,
  selectedItemId: React.PropTypes.number,
  scrollToSelected: React.PropTypes.bool,
  onSelectItem: React.PropTypes.func.isRequired,
};

export default SpotList;

