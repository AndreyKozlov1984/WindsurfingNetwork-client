// @flow
import createContainer from './CheckboxFilterContainer';
export default createContainer({
  filterId: 'entrance',
  title: 'Entrance',
  options: [
    {
      id: 'shallow',
      name: 'shallow',
    },
    {
      id: 'average',
      name: 'average',
    },
    {
      id: 'deep',
      name: 'deep',
    },
  ],
});

