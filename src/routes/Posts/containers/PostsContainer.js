// @flow
import { connect } from 'react-redux';

import Posts from '../components/Posts';
import { type State } from '~/store/state';
const mapDispatchToProps = {};

const mapStateToProps = (state: State) => ({
  data: (state.posts || {}).data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);

