import createContainer from './CheckboxFilterContainer';
export default createContainer({
  filterId: 'benthal',
  title: 'Benthal',
  options: [
    {
      id: 'sand',
      name: 'sand',
    },
    {
      id: 'small_stones',
      name: 'small stones',
    },
    {
      id: 'large_stones',
      name: 'large stones',
    },
    {
      id: 'pebble',
      name: 'pebble',
    },
    {
      id: 'coral',
      name: 'coral',
    },
  ],
});

