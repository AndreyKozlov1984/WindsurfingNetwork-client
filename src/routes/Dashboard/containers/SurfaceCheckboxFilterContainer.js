import createContainer from './CheckboxFilterContainer';
export default createContainer({
  filterId: 'surface',
  title: 'Surface',
  options: [
    {
      id: 'flat',
      name: 'Flat',
    },
    {
      id: 'small_chop',
      name: 'Small Chop',
    },
    {
      id: 'chop',
      name: 'Chop',
    },
    {
      id: 'wave',
      name: 'Waves',
    },
    {
      id: 'big_wave',
      name: 'Big Waves',
    },
  ],
});

