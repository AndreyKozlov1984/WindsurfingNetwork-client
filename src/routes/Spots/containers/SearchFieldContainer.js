// @flow
import { connect } from 'react-redux';
import { type State } from '~/store/state';
import { type DispatchProps, type StateProps, SearchField } from '../components/SpotUsers/SearchField';
import { changeFilters } from '../modules/spotUsers';

const mapDispatchToProps: DispatchProps = {
  onChange: changeFilters,
};
const mapStateToProps = (state: State): StateProps => ({
  value: state.spotUsers.search,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchField);

