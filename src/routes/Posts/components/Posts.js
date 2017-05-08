// @flow
import React from 'react';
import { Grid } from 'react-bootstrap';
import SinglePost from './SinglePost';
import { type Post as PostType } from '../modules/posts';

export type StateProps = {| data: PostType[] |};
export type DispatchProps = {} & $Exact<{}>;
type Props = {| ...StateProps, ...DispatchProps |};
const Posts = ({ data }: Props): React$Element<any> => {
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{ overflowY: 'auto', height: '100%' }}>
      <Grid>
        <h2>Posts</h2>
        {data.map((post: PostType) => <SinglePost key={post.id} {...post} />)}
      </Grid>
    </div>
  );
};

export default Posts;

