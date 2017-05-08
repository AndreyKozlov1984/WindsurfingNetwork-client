// @flow
import React from 'react';
import Activity from './Activity';
import { Panel } from 'react-bootstrap';

import { type Activity as ActivityType } from '../modules/dashboard';

export type DispatchProps = {} & $Exact<{}>;
export type StateProps = {|
  items: ActivityType[],
|};
type Props = {| ...StateProps, ...DispatchProps |};

const ActivityList = ({ items }: Props) => (
  <Panel header='Activity List'>
    {items.map((item: ActivityType) => <Activity key={item.id} {...item} />)}
  </Panel>
);

export default ActivityList;

