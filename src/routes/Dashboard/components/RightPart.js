// @flow
import React from 'react';
import SpotListContainer from '../containers/SpotListContainer';
import ActivityListContainer from '../containers/ActivityListContainer';

export type StateProps = {|
  scrollPosition: number,
|};
export type DispatchProps = {|
  onScroll: Function,
|};
export type Props = {| ...StateProps, ...DispatchProps |};
const RightPart = ({ scrollPosition, onScroll }: Props) => {
  let scrollContainer = null; // eslint-disable-line immutable/no-let
  return (
    <div
      className='layout-right scroll-container'
      ref={(x: HTMLElement) => {
        scrollContainer = x;
      }}
      onScroll={function () {
        if (scrollContainer) {
          onScroll(scrollContainer.scrollTop);
        }
      }}
      style={{ width: '400px' }}
      scrollTop={scrollPosition}
    >
      <SpotListContainer />
      <ActivityListContainer />
    </div>
  );
};
export default RightPart;

