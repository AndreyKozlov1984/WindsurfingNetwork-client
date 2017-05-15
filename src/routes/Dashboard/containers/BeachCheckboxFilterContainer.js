// @flow
import createContainer from './CheckboxFilterContainer';
import { beachOptions } from '~/enums/conditions';
export default createContainer({
  filterId: 'beach',
  title: 'Beach',
  options: beachOptions,
});

