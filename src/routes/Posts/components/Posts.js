// @flow
import React from 'react';
import { Grid } from 'react-bootstrap';
import SinglePost from './SinglePost';
import { type Post } from '../modules/posts';

const Posts = ({ data }: { data: Post[] }): React$Element<any> => {
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{ overflowY: 'auto', height: '100%' }}>
      <Grid>
        <h2>Posts</h2>
        {data.map((post: Post) => <SinglePost {...post} />)}
      </Grid>
    </div>
  );
};

export default Posts;

