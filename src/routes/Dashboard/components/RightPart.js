import React from 'react';
import SpotListContainer from '../containers/SpotListContainer';
import ActivityListContainer from '../containers/ActivityListContainer';

const RightPart = ({ scrollPosition, onScroll }) => {
  let scrollContainer = null;
  return (
    <div
      className='layout-right scroll-container'
      ref={x => {
        scrollContainer = x;
      }}
      onScroll={function () {
        onScroll(scrollContainer.scrollTop);
      }}
      style={{ width: '400px' }}
      scrollTop={scrollPosition}
    >
      <SpotListContainer />
      <ActivityListContainer />
    </div>
  );
};
RightPart.propTypes = {
  scrollPosition: React.PropTypes.number.isRequired,
  onScroll: React.PropTypes.function,
};
export default RightPart;

