// @flow
import React from 'react';
import SpotEditForm from './SpotEditForm';
import { Grid } from 'react-bootstrap';
import { type SpotForm } from '../modules/spotEdit';

export type StateProps = {|
  form: ?SpotForm,
|};
export type DispatchProps = {|
  onSubmit: Function,
  onCancel: Function,
|};
export type Props = {| ...StateProps, ...DispatchProps |};
const SpotEdit = ({ form, onSubmit, onCancel }: Props): React$Element<any> => {
  if (!form) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{ overflowY: 'auto', height: 'calc(100% - 70px)' }}>
      <Grid>
        <h1> Editing an existing spot </h1>
        <SpotEditForm onSubmit={onSubmit} onCancel={onCancel} initialValues={form.values} />
      </Grid>
    </div>
  );
};
export default SpotEdit;

