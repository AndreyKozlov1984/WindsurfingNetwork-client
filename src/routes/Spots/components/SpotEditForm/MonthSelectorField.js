// @flow
import React from 'react';
import _ from 'lodash';
import { FormControl } from 'react-bootstrap';
import { monthByNumber } from '~/utils/formatters';
/* eslint-disable immutable/no-this */
type Props = {|
  input: any,
  meta: any,
|};
export const MonthSelectorField = ({ input, meta }: Props) => (
  <FormControl componentClass='select' {...input}>
    {_.range(12).map((month: number) => <option key={month} value={month}>{monthByNumber(month)}</option>)}
  </FormControl>
);
/* eslint-enable immutable/no-this */

