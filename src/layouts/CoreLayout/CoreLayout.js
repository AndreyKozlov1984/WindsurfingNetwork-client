import React from 'react';
import Header from '~/components/Header';
import './CoreLayout.scss';
import '~/styles/core.scss';

export const CoreLayout = ({ children }) => (
  <div className='fullscreen' style={{ height: '100%' }}>
    <Header />
    {children}
  </div>
);

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default CoreLayout;

