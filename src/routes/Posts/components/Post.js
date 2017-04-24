import { Grid } from 'react-bootstrap';
import SinglePost from './SinglePost';
import React from 'react';

const Post = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }
  const post = data;
  return (
    <div style={{ overflowY: 'auto', height: '100%' }}>
      <Grid>
        <SinglePost {...post} />
      </Grid>
    </div>
  );
};

Post.propTypes = {
  data: React.PropTypes.object,
};

export default Post;

