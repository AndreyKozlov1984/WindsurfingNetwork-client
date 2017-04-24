import moment from 'moment';
export function formatDate (input) {
  return moment(input).format('DD.MM.YYYY');
}
export function formatDateTime (input) {
  return moment(input).format('DD.MM.YYYY HH:mm');
}

export const centerStyles = {
  margin: 0,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export function monthByNumber (month) {
  return moment(+month + 1, 'MM').format('MMMM');
}

export function propertyNameText (propertyId) {
  return {
    surface: 'Surface',
    wind: 'Wind',
    beach: 'Beach',
    convenience: 'Convenience',
    entrance: 'Entrance',
    benthal: 'Benthal',
    danger: 'Dangers',
  }[propertyId];
}
export function propertyValueText (valueId) {
  return {
    flat: 'Flat',
    small_chop: 'Small Chop',
    chop: 'Chop',
    wave: 'Waves',
    big_wave: 'Big Waves',
    to_coast: 'To the coast',
    to_coast_angle: 'To the coast with angle',
    across_coast: 'Across the coast',
    offshore: 'Offshore',
    shallow: 'Shallow',
    average: 'Average',
    deep: 'Deep',
    narrow: 'Narrow',
    middle: 'Average',
    wide: 'Wide',
    sand: 'Sand',
    small_stones: 'Small stones',
    large_stones: 'Large stones',
    pebble: 'Pebble',
    coral: 'Coral',
    ground: 'Ground',
    grass: 'Grass',
    current: 'Strong current',
    sea_animals: 'Sea urchins',
    jellyfish: 'Jellyfishes',
    trees: 'Trees',
    nets: 'Nets',
    fishes: 'Fishes',
    sharks: 'Sharks',
  }[valueId];
}

