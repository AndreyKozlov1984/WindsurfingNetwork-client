// @flow
import React from 'react';
import Header from '~/components/Header';
import './CoreLayout.scss';
import '~/styles/core.scss';
import { AuthGlobals } from 'redux-auth/bootstrap-theme';

export const CoreLayout = ({ children }: { children: React$Element<any> }) => (
  <div className='fullscreen' style={{ height: '100%' }}>
    <AuthGlobals />
    <Header />
    {children}
  </div>
);

export default CoreLayout;

