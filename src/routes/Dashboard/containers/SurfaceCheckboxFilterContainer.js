// @flow
import { surfaceOptions } from '~/enums/conditions';
import createContainer from './CheckboxFilterContainer';
export default createContainer({
  filterId: 'surface',
  title: 'Surface',
  options: surfaceOptions,
});

