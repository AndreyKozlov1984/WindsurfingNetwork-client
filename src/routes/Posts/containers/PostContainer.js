// @flow
import { connect } from 'react-redux';

import { default as Post, type StateProps, type DispatchProps } from '../components/Post';
import { type State } from '~/store/state';

const mapDispatchToProps: DispatchProps = {};

const mapStateToProps = (state: State): StateProps => ({
  data: state.posts.selectedPost,
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);

