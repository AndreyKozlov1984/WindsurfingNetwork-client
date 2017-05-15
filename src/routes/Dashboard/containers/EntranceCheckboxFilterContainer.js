// @flow
import createContainer from './CheckboxFilterContainer';
import { entranceOptions } from '~/enums/conditions';
export default createContainer({
  filterId: 'entrance',
  title: 'Entrance',
  options: entranceOptions,
});

