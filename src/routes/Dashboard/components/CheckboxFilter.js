// @flow
import React from 'react';
import { mapValues } from 'lodash';
import { Checkbox, Panel } from 'react-bootstrap';

export type Option = {|
  id: string,
  name: string,
|};
export type DispatchProps = {|
  onChange: Function,
|};
export type StateProps = {|
  value: { [string]: boolean },
  title: string,
  options: Option[],
|};
type Props = {| ...DispatchProps, ...StateProps |};

const CheckboxFilter = function ({ options, value = {}, title, onChange }: Props) {
  const inputs: { [string]: HTMLInputElement } = {};
  const onFilterChecked = function () {
    value = mapValues(inputs, (input: HTMLInputElement) => input.checked);
    onChange(value);
  };
  return (
    <Panel header={title}>
      {options.map(function (filter: Option) {
        return (
          <Checkbox
            key={filter.id}
            inputRef={(input: HTMLInputElement) => {
              inputs[filter.id] = input; // eslint-disable-line immutable/no-mutation
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

export default CheckboxFilter;

