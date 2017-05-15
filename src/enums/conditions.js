// @flow
import _ from 'lodash';
export type Beach = {|
  sand: boolean,
  ground: boolean,
  grass: boolean,
  rocky: boolean,
|};
export type BeachKey = $Keys<Beach>;
export type BeachName = { [BeachKey]: string };

export const beachLabels: BeachName = {
  sand: 'Sand',
  ground: 'Ground',
  grass: 'Grass',
  rocky: 'Rocky',
};

export function mapBeach<T> (fn: (label: string, name: BeachKey) => T): T[] {
  return _.map(beachLabels, fn);
}

export const beachOptions: {|
  id: BeachKey,
  name: string,
|}[] = mapBeach((label: string, name: BeachKey) => ({ id: name, name: label }));

export type Surface = {|
  flat: boolean,
  small_chop: boolean,
  chop: boolean,
  wave: boolean,
  big_wave: boolean,
|};
export type SurfaceKey = $Keys<Surface>;
export type SurfaceName = { [SurfaceKey]: string };

export const surfaceLabels: SurfaceName = {
  flat: 'Flat',
  small_chop: 'Small Chop',
  chop: 'Chop',
  wave: 'Wave',
  big_wave: 'Big Waves',
};
export function mapSurface<T> (fn: (label: string, name: SurfaceKey) => T): T[] {
  return _.map(surfaceLabels, fn);
}
export const surfaceOptions: {|
  id: SurfaceKey,
  name: string,
|}[] = mapSurface((label: string, name: SurfaceKey) => ({ id: name, name: label }));

export type Wind = {|
  to_coast: boolean,
  to_coast_angle: boolean,
  across_coast: boolean,
  offshore: boolean,
|};
export type WindKey = $Keys<Wind>;
export type WindName = { [WindKey]: string };

export const windLabels: WindName = {
  to_coast: 'To the coast',
  to_coast_angle: 'To the coast with angle',
  across_coast: 'Across the coast',
  offshore: 'Offshore',
};
export function mapWind<T> (fn: (label: string, name: WindKey) => T): T[] {
  return _.map(windLabels, fn);
}

export const windOptions: {|
  id: WindKey,
  name: string,
|}[] = mapWind((label: string, name: WindKey) => ({ id: name, name: label }));

export type Convenience = {|
  narrow: boolean,
  middle: boolean,
  wide: boolean,
|};
export type ConvenienceKey = $Keys<Convenience>;
export type ConvenienceName = { [ConvenienceKey]: string };

export const convenienceLabels: ConvenienceName = {
  narrow: 'narrow',
  middle: 'middle',
  wide: 'wide',
};
export function mapConvenience<T> (fn: (label: string, name: ConvenienceKey) => T): T[] {
  return _.map(convenienceLabels, fn);
}

export const convenienceOptions: {|
  id: ConvenienceKey,
  name: string,
|}[] = mapConvenience((label: string, name: ConvenienceKey) => ({ id: name, name: label }));

export type Benthal = {|
  sand: boolean,
  small_stones: boolean,
  large_stones: boolean,
  pebble: boolean,
  coral: boolean,
|};
export type BenthalKey = $Keys<Benthal>;
export type BenthalName = { [BenthalKey]: string };

export const benthalLabels: BenthalName = {
  sand: 'sand',
  small_stones: 'small stones',
  large_stones: 'large stones',
  pebble: 'pebble',
  coral: 'coral',
};
export function mapBenthal<T> (fn: (label: string, name: BenthalKey) => T): T[] {
  return _.map(benthalLabels, fn);
}

export const benthalOptions: {|
  id: BenthalKey,
  name: string,
|}[] = mapBenthal((label: string, name: BenthalKey) => ({ id: name, name: label }));

export type Entrance = {|
  shallow: boolean,
  average: boolean,
  deep: boolean,
|};

export type EntranceKey = $Keys<Entrance>;
export type EntranceName = { [EntranceKey]: string };

export const entranceLabels: EntranceName = {
  shallow: 'Shallow',
  average: 'Average',
  deep: 'Deep',
};
export function mapEntrance<T> (fn: (label: string, name: EntranceKey) => T): T[] {
  return _.map(entranceLabels, fn);
}

export const entranceOptions: {|
  id: EntranceKey,
  name: string,
|}[] = mapEntrance((label: string, name: EntranceKey) => ({ id: name, name: label }));

export type Danger = {|
  current: boolean,
  animals: boolean,
  jellyfish: boolean,
  trees: boolean,
  nets: boolean,
  fishes: boolean,
  sharks: boolean,
|};

export type DangerKey = $Keys<Danger>;
export type DangerName = { [DangerKey]: string };

export const dangerLabels: DangerName = {
  current: 'Currents',
  animals: 'Sea Animals',
  jellyfish: 'Jellyfishes',
  trees: 'Trees',
  nets: 'Nets',
  fishes: 'Fishes',
  sharks: 'Sharks',
};

export const dangerInvertedLabels: DangerName = {
  current: 'No currents',
  animals: 'No sea Animals',
  jellyfish: 'No jellyfishes',
  trees: 'No trees',
  nets: 'No nets',
  fishes: 'No fishes',
  sharks: 'No sharks',
};
export function mapDanger<T> (fn: (label: string, name: DangerKey) => T): T[] {
  return _.map(dangerLabels, fn);
}

export const dangerOptions: {|
  id: DangerKey,
  name: string,
|}[] = mapDanger((label: string, name: DangerKey) => ({ id: name, name: label }));
export const dangerInvertedOptions: {|
  id: DangerKey,
  name: string,
|}[] = mapDanger((label: string, name: DangerKey) => ({ id: name, name: dangerInvertedLabels[name] }));

export type ConditionKey = 'beach' | 'surface' | 'wind' | 'convenience' | 'benthal' | 'entrance' | 'danger';
export const conditionLabels: { [ConditionKey]: string } = {
  beach: 'Beach',
  surface: 'Surface',
  wind: 'Wind',
  convenience: 'Convenience',
  benthal: 'Benthal',
  entrance: 'Entrance',
};

export function getLabels (key: ConditionKey): { [$Subtype<string>]: string } {
  if (key === 'beach') {
    return beachLabels;
  }
  if (key === 'surface') {
    return surfaceLabels;
  }
  if (key === 'wind') {
    return windLabels;
  }
  if (key === 'convenience') {
    return convenienceLabels;
  }
  if (key === 'benthal') {
    return benthalLabels;
  }
  if (key === 'entrance') {
    return entranceLabels;
  }
  if (key === 'danger') {
    return dangerLabels;
  }
  (key: empty);
  throw new Error(`wrong key: ${key}`);
}
export function getOptions (key: ConditionKey): {| id: $Subtype<string>, name: string |}[] {
  if (key === 'beach') {
    return beachOptions;
  }
  if (key === 'surface') {
    return surfaceOptions;
  }
  if (key === 'wind') {
    return windOptions;
  }
  if (key === 'convenience') {
    return convenienceOptions;
  }
  if (key === 'benthal') {
    return benthalOptions;
  }
  if (key === 'entrance') {
    return entranceOptions;
  }
  if (key === 'danger') {
    return dangerOptions;
  }
  (key: empty);
  throw new Error(`wrong key: ${key}`);
}

export function mapConditions<T> (
  fn: (
    {|
      name: string,
      label: string,
      labels: { [$Subtype<string>]: string },
      options: {| id: $Subtype<string>, name: string |}[],
    |},
    number,
  ) => T,
): T[] {
  return _.map(_.keys(conditionLabels), function (key: ConditionKey, index: number) {
    return fn(
      {
        name: key,
        label: conditionLabels[key],
        labels: getLabels(key),
        options: getOptions(key),
      },
      index,
    );
  });
}

