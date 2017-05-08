// @flow
import { Grid } from 'react-bootstrap';
import SinglePost from './SinglePost';
import React from 'react';
import { type Post } from '../modules/posts';

export type StateProps = {|
  data: ?Post,
|};
export type DispatchProps = {} & $Exact<{}>;
export type Props = {| ...DispatchProps, ...StateProps |};
/* eslint-disable immutable/no-this */
class PostComponent extends React.PureComponent {
  props: Props;
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
/* eslint-enable immutable/no-this */

export default PostComponent;

