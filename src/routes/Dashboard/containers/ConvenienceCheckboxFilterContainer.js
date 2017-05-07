// @flow
import createContainer from './CheckboxFilterContainer';
export default createContainer({
  filterId: 'convenience',
  title: 'Convenience',
  options: [
    {
      id: 'narrow',
      name: 'narrow',
    },
    {
      id: 'middle',
      name: 'average',
    },
    {
      id: 'wide',
      name: 'wide',
    },
  ],
});

