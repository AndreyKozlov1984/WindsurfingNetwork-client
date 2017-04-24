// We have a set of regions, and a set of countries.
// A user should be able to choose any region / any country
import React from 'react';
import { Panel, FormControl } from 'react-bootstrap';

const CountrySelector = function ({ options, value, onChange }) {
  const onChangeHandler = function (e) {
    onChange(e.target.value);
  };
  return (
    <Panel header='Country'>
      <FormControl componentClass='select' value={value} placeholder='select' onChange={onChangeHandler}>
        {options.map(function (option) {
          return <option value={option.id}>{option.name}</option>;
        })}
      </FormControl>
    </Panel>
  );
};

CountrySelector.propTypes = {
  options: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default CountrySelector;

