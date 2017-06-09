// @flow
import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

export type StateProps = {|
  value: string,
|};
export type DispatchProps = {|
  onChange: string => any,
|};
type Props = {| ...StateProps, ...DispatchProps |};

export const SearchField = ({ value, onChange }: Props) => {
  const fn = (e: any) => onChange(e.target.value);
  return (
    <FormGroup>
      <FormControl type='text' placeholder='Search' value={value} onChange={fn} />
    </FormGroup>
  );
};

