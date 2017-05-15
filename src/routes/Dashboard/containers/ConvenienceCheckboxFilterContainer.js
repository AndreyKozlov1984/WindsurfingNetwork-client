// @flow
import createContainer from './CheckboxFilterContainer';
import { convenienceOptions } from '~/enums/conditions';
export default createContainer({
  filterId: 'convenience',
  title: 'Convenience',
  options: convenienceOptions,
});

