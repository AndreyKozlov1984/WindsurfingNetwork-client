// @flow
import createContainer from './CheckboxFilterContainer';
export default createContainer({
  filterId: 'danger',
  title: 'Safety',
  options: [
    {
      id: 'current',
      name: 'No strong currents',
    },
    {
      id: 'sea_animals',
      name: 'No sea urchins',
    },
    {
      id: 'jellyfish',
      name: 'No jellyfishes',
    },
    {
      id: 'trees',
      name: 'No trees',
    },
    {
      id: 'nets',
      name: 'No nets',
    },
    {
      id: 'fishes',
      name: 'No fishes',
    },
    {
      id: 'sharks',
      name: 'No sharks',
    },
  ],
});

