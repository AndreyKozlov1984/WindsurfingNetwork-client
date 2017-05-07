// @flow
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { setFilterState } from '../modules/dashboard';

import { type State } from '~/store/state';
import {
  default as CountrySelector,
  type StateProps,
  type DispatchProps,
  type Option,
} from '../components/CountrySelector';

const mapDispatchToProps: DispatchProps = {
  onChange: function (selectedItem: string) {
    return setFilterState({ filterId: 'country', filterValue: selectedItem });
  },
};

const getOptions = createSelector(
  [(state: State): string[] => (state.dashboard.lookupData ? state.dashboard.lookupData.countries : [])],
  (countries: string[]): Option[] => [
    { id: '', name: 'All Countries' },
    ...countries.map((c: string) => ({ id: c, name: c })),
  ],
);

const mapStateToProps = (state: State): StateProps => ({
  options: getOptions(state),
  value: state.dashboard.filters.country,
});

export default connect(mapStateToProps, mapDispatchToProps)(CountrySelector);

