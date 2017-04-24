import createContainer from './CheckboxFilterContainer';
export default createContainer({
  filterId: 'wind',
  title: 'Wind Direction',
  options: [
    {
      id: 'to_coast',
      name: 'To the coast',
    },
    {
      id: 'to_coast_angle',
      name: 'To the coast with angle',
    },
    {
      id: 'across_coast',
      name: 'Across the coast',
    },
    {
      id: 'offshore',
      name: 'Offshore',
    },
  ],
});

