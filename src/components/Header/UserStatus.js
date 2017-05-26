// @flow
import React from 'react';
import { SignOutButton } from 'redux-auth/bootstrap-theme';
import { Nav, NavItem, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { type AuthUserState } from '~/store/state';

export type StateProps = {|
  user: AuthUserState,
|};
export type DispatchProps = {} & $Exact<{}>;
export type Props = {| ...StateProps, ...DispatchProps |};
export const UserStatus = ({ user }: Props) => {
  if (user.attributes) {
    return (
      <Nav>
        <NavItem>Logged in as {user.attributes.email} ({user.attributes.role})</NavItem>
        <SignOutButton className='navbar-btn' />;
      </Nav>
    );
  } else {
    return (
      <LinkContainer to='/login'>
        <Button bsStyle='default' className='navbar-btn'>Login</Button>
      </LinkContainer>
    );
  }
};

