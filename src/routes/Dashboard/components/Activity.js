// @flow
import React from 'react';

import { type Activity as ActivityType } from '../modules/dashboard';

export type Props = {|...ActivityType|};
const Activity = ({ name, content, date }: Props) => (
  <div>
    <div>
      <span>Spot: </span><span />
      <span>User: </span><span>{name}</span>
    </div>
    <div>
      <span>Message:</span><span>{content}</span>
      <span><b>{date}</b></span>
    </div>
  </div>
);

export default Activity;

