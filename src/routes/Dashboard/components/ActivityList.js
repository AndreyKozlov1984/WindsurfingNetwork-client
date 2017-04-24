import React from 'react';
import Activity from './Activity';
import { Panel } from 'react-bootstrap';

const ActivityList = ({ items }) => (
  <Panel header='Activity List'>
    {items.map(item => <Activity {...item} />)}
  </Panel>
);

ActivityList.propTypes = {
  items: React.PropTypes.array.isRequired,
};

export default ActivityList;

