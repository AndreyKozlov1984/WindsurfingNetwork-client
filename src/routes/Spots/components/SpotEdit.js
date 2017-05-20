// @flow
import React from 'react';
import SpotEditForm from './SpotEditForm';
import { Grid } from 'react-bootstrap';
import { type SpotForm, type Values } from '../modules/spotEdit';

export type StateProps = {|
  form: ?SpotForm,
|};
export type DispatchProps = {|
  onSubmit: (values: Values) => any,
  onCancel: () => any,
  onRotateLeft: Function,
  onRotateRight: Function,
|};
export type Props = {| ...StateProps, ...DispatchProps |};
const SpotEdit = ({ form, onRotateLeft, onRotateRight, onSubmit, onCancel }: Props): React$Element<any> => {
  if (!form) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{ overflowY: 'auto', height: 'calc(100% - 70px)' }}>
      <Grid>
        <h1> Editing an existing spot </h1>
        <SpotEditForm
          onRotateLeft={onRotateLeft}
          onRotateRight={onRotateRight}
          onSubmit={onSubmit}
          onCancel={onCancel}
          initialValues={form.values}
          lookups={form.lookups}
        />
      </Grid>
    </div>
  );
};
export default SpotEdit;

