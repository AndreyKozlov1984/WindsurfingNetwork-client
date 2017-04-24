import React from 'react';
import { mapValues } from 'lodash';
import { Checkbox, Panel } from 'react-bootstrap';

const CheckboxFilter = function ({ options, value = {}, title, onChange }) {
  let inputs = {};
  const onFilterChecked = function (e) {
    value = mapValues(inputs, input => input.checked);
    onChange(value);
  };
  return (
    <Panel header={title}>
      {options.map(function (filter) {
        return (
          <Checkbox
            key={filter.id}
            inputRef={input => {
              inputs[filter.id] = input;
            }}
            inline
            checked={value[filter.id]}
            onChange={onFilterChecked}
          >
            {filter.name}
          </Checkbox>
        );
      })}
    </Panel>
  );
};

CheckboxFilter.propTypes = {
  options: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: React.PropTypes.object.isRequired,
  title: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default CheckboxFilter;

