// @flow
import createContainer from './CheckboxFilterContainer';
import { dangerInvertedOptions } from '~/enums/conditions';
export default createContainer({
  filterId: 'danger',
  title: 'Safety',
  options: dangerInvertedOptions,
});

