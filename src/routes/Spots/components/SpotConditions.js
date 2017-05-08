// @flow
import React from 'react';
import { Badge, Table } from 'react-bootstrap';
import _ from 'lodash';
import { propertyNameText, propertyValueText } from '~/utils/formatters';
import { type Spot as SpotType } from '../modules/spots';

const ConditionElement = function ({ spot, property }: { spot: SpotType, property: string }) {
  const values: { [string]: boolean } = spot[property + '_type'];
  const selectedValues = _.keys(_.pickBy(values));
  const combinedSelectedValues = selectedValues.map((value: string, index: number) => (
    <Badge key={index}>{propertyValueText(value)}</Badge>
  ));
  const propertyName = propertyNameText(property);
  return (
    <tr>
      <td>{propertyName}</td>
      <td>{combinedSelectedValues}</td>
    </tr>
  );
};

const SpotConditions = ({ spot }: { spot: SpotType }) => (
  <Table condensed hover>
    <tbody>
      {['surface', 'beach', 'wind', 'convenience', 'entrance', 'benthal', 'danger'].map(function (property: string) {
        return <ConditionElement spot={spot} key={property} property={property} />;
      })}
    </tbody>
  </Table>
);

export default SpotConditions;

