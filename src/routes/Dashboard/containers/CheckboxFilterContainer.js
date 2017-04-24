import { connect } from 'react-redux';
import { setFilterState } from '../modules/dashboard';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the dashboard:   */

import CheckboxFilter from '../components/CheckboxFilter';

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */
export default function ({ filterId, title, options }) {
  const mapDispatchToProps = {
    onChange: function (filterValue) {
      return setFilterState({ filterId, filterValue });
    },
  };

  const mapStateToProps = state => ({
    options: options,
    value: state.dashboard.filters[filterId],
    title: title,
  });

  return connect(mapStateToProps, mapDispatchToProps)(CheckboxFilter);
}

