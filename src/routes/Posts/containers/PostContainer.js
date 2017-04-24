import { connect } from 'react-redux';

import Post from '../components/Post';

const mapDispatchToProps = {};

const mapStateToProps = state => ({
  data: (state.posts || {}).selectedPost,
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);

