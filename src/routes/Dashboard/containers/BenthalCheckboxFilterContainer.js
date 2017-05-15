// @flow
import createContainer from './CheckboxFilterContainer';
import { benthalOptions } from '~/enums/conditions';
export default createContainer({
  filterId: 'benthal',
  title: 'Benthal',
  options: benthalOptions,
});

