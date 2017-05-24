// @flow
import React from 'react';
import { EmailSignInForm } from 'redux-auth/bootstrap-theme';
import { Grid, Col } from 'react-bootstrap';

export type StateProps = {} & $Exact<{}>;
export type DispatchProps = {| onSuccess: () => any |};
export type Props = {| ...StateProps, ...DispatchProps |};
export const Login = (props: Props) => (
  <Grid>
    <Col md={4} mdOffset={4}>
      <EmailSignInForm next={props.onSuccess} />
    </Col>
  </Grid>
);

