import React from 'react';

const Activity = ({ name, content, date }) => (
  <div>
    <div>
      <span>Spot: </span><span />
      <span>User: </span><span>{name}</span>
    </div>
    <div>
      <span>Message:</span><span>{content}</span>
      <span><b>{date}</b></span>
    </div>
  </div>
);

Activity.propTypes = {
  name: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
};

export default Activity;

