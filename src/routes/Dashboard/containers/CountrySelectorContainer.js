import { connect } from 'react-redux';
import { setFilterState } from '../modules/dashboard';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the dashboard:   */

import CountrySelector from '../components/CountrySelector';

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  onChange: function (selectedItem) {
    return setFilterState({ filterId: 'country', filterValue: selectedItem });
  },
};

const mapStateToProps = state => ({
  options: [
    { id: '', name: 'All Countries' },
    ...state.dashboard.lookup.countries.map(function (c) {
      return { id: c, name: c };
    }),
  ],
  value: state.dashboard.filters.country,
});

export default connect(mapStateToProps, mapDispatchToProps)(CountrySelector);

