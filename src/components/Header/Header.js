import React from 'react';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

export const Header = () => (
  <Navbar staticTop className='header'>
    <Nav>
      <Nav>
        <IndexLinkContainer to='/'>
          <NavItem>Dashboard</NavItem>
        </IndexLinkContainer>
        <LinkContainer to='/posts'>
          <NavItem>Feed</NavItem>
        </LinkContainer>
        <LinkContainer to='/spots'>
          <NavItem>Spots</NavItem>
        </LinkContainer>
      </Nav>
    </Nav>
  </Navbar>
);

export default Header;

