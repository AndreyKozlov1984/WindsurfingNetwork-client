import React from 'react';
import Spot from './Spot';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

const SpotList = ({ items, selectedItemId, scrollToSelected, onSelectItem }) => {
  let selected = null;
  if (scrollToSelected) {
    setTimeout(
      function () {
        selected.scrollIntoView();
      },
      1,
    );
  }
  return (
    <Panel header={`Spots List (${items.length})`}>
      <ListGroup>
        {items.map(item => (
          <ListGroupItem key={item.id} active={item.id === selectedItemId} onClick={() => onSelectItem(item.id)}>
            <div
              ref={x => {
                if (item.id === selectedItemId) {
                  selected = x;
                }
              }}
            >
              <Spot {...item} useLinks={item.id === selectedItemId} />
            </div>
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

