import { connect } from 'react-redux';

import Posts from '../components/Posts';

const mapDispatchToProps = {};

const mapStateToProps = state => ({
  data: (state.posts || {}).data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);

