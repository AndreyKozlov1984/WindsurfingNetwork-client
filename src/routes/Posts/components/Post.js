// @flow
import { Grid } from 'react-bootstrap';
import SinglePost from './SinglePost';
import React from 'react';
import { type Post } from '../modules/posts';

export type PostProps = {|
  data: ?Post,
|};
class PostComponent extends React.PureComponent {
  props: PostProps;
  // eslint-disable-next-line flowtype/no-weak-types
  render (): React$Element<any> {
    if (!this.props.data) {
      return <div>Loading...</div>;
    }
    const post = this.props.data;
    return (
      <div style={{ overflowY: 'auto', height: '100%' }}>
        <Grid>
          <SinglePost {...post} />
        </Grid>
      </div>
    );
  }
}

export default PostComponent;

