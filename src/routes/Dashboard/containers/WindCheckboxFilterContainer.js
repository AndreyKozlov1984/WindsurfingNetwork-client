// @flow
import createContainer from './CheckboxFilterContainer';
import { windOptions } from '~/enums/conditions';
export default createContainer({
  filterId: 'wind',
  title: 'Wind Direction',
  options: windOptions,
});

