// @flow
import { connect } from 'react-redux';
import { setFilterState } from '../modules/dashboard';
import { type State } from '~/store/state';

import {
  default as CheckboxFilter,
  type Option,
  type StateProps,
  type DispatchProps,
} from '../components/CheckboxFilter';

export default function ({ filterId, title, options }: {| filterId: string, title: string, options: Option[] |}) {
  const onChange = function (filterValue: { [string]: boolean }) {
    return setFilterState({ filterId, filterValue });
  };
  const mapDispatchToProps: DispatchProps = {
    onChange: onChange,
  };

  const mapStateToProps = (state: State): StateProps => ({
    options: options,
    value: state.dashboard.filters[filterId],
    title: title,
  });

  return connect(mapStateToProps, mapDispatchToProps)(CheckboxFilter);
}

