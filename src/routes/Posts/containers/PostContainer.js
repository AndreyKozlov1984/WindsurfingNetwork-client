// @flow
import { connect } from 'react-redux';

import { default as Post, type PostProps } from '../components/Post';
import { type State } from '~/store/state';

const mapDispatchToProps = {};

const mapStateToProps = (state: State): $Shape<PostProps> => ({
  data: state.posts.selectedPost,
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);

