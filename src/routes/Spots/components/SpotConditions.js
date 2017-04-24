import React from 'react';
import { Badge, Table } from 'react-bootstrap';
import _ from 'lodash';
import { propertyNameText, propertyValueText } from '~/utils/formatters';

const ConditionElement = function ({ spot, property }) {
  const values = spot[property + '_type'];
  const selectedValues = _.keys(_.pickBy(values));
  console.info(selectedValues);
  const combinedSelectedValues = selectedValues.map(value => <Badge>{propertyValueText(value)}</Badge>);
  const propertyName = propertyNameText(property);
  return (
    <tr>
      <td>{propertyName}</td>
      <td>{combinedSelectedValues}</td>
    </tr>
  );
};
ConditionElement.propTypes = {
  spot: React.PropTypes.object.isRequired,
  property: React.PropTypes.string.isRequired,
};

const SpotConditions = ({ spot }) => (
  <Table condensed hover>
    <tbody>
      {['surface', 'beach', 'wind', 'convenience', 'entrance', 'benthal', 'danger'].map(function (property) {
        return <ConditionElement spot={spot} property={property} />;
      })}
    </tbody>
  </Table>
);
SpotConditions.propTypes = {
  spot: React.PropTypes.object.isRequired,
};

export default SpotConditions;

