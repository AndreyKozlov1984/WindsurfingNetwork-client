// @flow
import React from 'react';
import { Grid } from 'react-bootstrap';
import SinglePost from './SinglePost';
import { type Post } from '../modules/posts';

const Posts = ({ data }: { data: Array<Post> }) => {
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{ overflowY: 'auto', height: '100%' }}>
      <Grid>
        <h2>Posts</h2>
        {data.map(function (post) {
          return <SinglePost {...post} />;
        })}
      </Grid>
    </div>
  );
};

Posts.propTypes = {
  data: React.PropTypes.array,
};

export default Posts;

