import createContainer from './CheckboxFilterContainer';
export default createContainer({
  filterId: 'beach',
  title: 'Beach',
  options: [
    {
      id: 'sand',
      name: 'Sandy',
    },
    {
      id: 'pebble',
      name: 'Rocky',
    },
    {
      id: 'ground',
      name: 'Ground',
    },
    {
      id: 'grass',
      name: 'Grass',
    },
  ],
});

