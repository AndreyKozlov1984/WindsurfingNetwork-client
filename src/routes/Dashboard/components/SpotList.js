import React from 'react';
import Spot from './Spot';
import { Panel } from 'react-bootstrap';

const SpotList = ({ items }) => (
  <Panel header={`Spots List (${items.length})`}>
    {items.map(item => <Spot {...item} />)}
  </Panel>
);

SpotList.propTypes = {
  items: React.PropTypes.array.isRequired,
};

export default SpotList;

