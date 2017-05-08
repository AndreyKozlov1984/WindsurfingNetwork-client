// @flow
// We have a set of regions, and a set of countries.
// A user should be able to choose any region / any country
import React from 'react';
import { Panel, FormControl } from 'react-bootstrap';

export type Option = {|
  id: string,
  name: string,
|};
export type StateProps = {|
  options: Option[],
  value: string,
|};
export type DispatchProps = {|
  onChange: Function,
|};
type Props = {| ...StateProps, ...DispatchProps |};
const CountrySelector = function ({ options, value, onChange }: Props) {
  const onChangeHandler = function (e: any) {
    onChange(e.target.value);
  };
  return (
    <Panel header='Country'>
      <FormControl componentClass='select' value={value} placeholder='select' onChange={onChangeHandler}>
        {options.map(function (option: Option) {
          return <option key={option.id} value={option.id}>{option.name}</option>;
        })}
      </FormControl>
    </Panel>
  );
};

export default CountrySelector;

