// @flow
import React from 'react';
import { Badge, Table } from 'react-bootstrap';
import _ from 'lodash-es';
import { type Spot as SpotType } from '../modules/spots';
import { mapConditions } from '~/enums/conditions';

const ConditionElement = function ({
  spot,
  property,
  label,
  labels,
}: { spot: SpotType, property: string, label: string, labels: { [string]: string } }) {
  const values: { [string]: boolean } = spot[property + '_type'];
  const selectedValues = _.keys(_.pickBy(values));
  const combinedSelectedValues = selectedValues.map((value: string, index: number) => (
    <Badge key={index}>{labels[value]}</Badge>
  ));
  return (
    <tr>
      <td>{label}</td>
      <td>{combinedSelectedValues}</td>
    </tr>
  );
};

const SpotConditions = ({ spot }: { spot: SpotType }) => (
  <Table condensed hover>
    <tbody>
      {mapConditions(function ({ name, label, labels }: { name: string, label: string, labels: { [string]: string } }) {
        return <ConditionElement spot={spot} key={name} property={name} label={label} labels={labels} />;
      })}
    </tbody>
  </Table>
);

export default SpotConditions;

