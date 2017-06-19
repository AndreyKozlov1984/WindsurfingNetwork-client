// @flow
import React from 'react';
import SpotListContainer from '../containers/SpotListContainer';

export type StateProps = {} & $Exact<{}>;
export type DispatchProps = {} & $Exact<{}>;
export type Props = {| ...StateProps, ...DispatchProps |};
const RightPart = ({ scrollPosition, onScroll }: Props) => {
  return (
    <div className='layout-right scroll-container' style={{ width: '400px' }}>
      <SpotListContainer />
    </div>
  );
};
export default RightPart;

