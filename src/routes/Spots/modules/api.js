// @flow
import fetch from 'isomorphic-fetch';
import validate from '~/utils/validator';
import { type Spot, type SpotForGallery, type SpotForUsers } from './spots';
export async function getSpot (id: number): Promise<Spot> {
  const response = await fetch(`/api/spots/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  (validate(__filename, __line, result): Spot);
  return result;
}

export async function getSpotGallery (id: number): Promise<SpotForGallery> {
  const response = await fetch(`/api/spots/${id}/gallery`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  (validate(__filename, __line, result): SpotForGallery);
  return result;
}

export async function getSpotUsers (id: number): Promise<SpotForUsers> {
  const response = await fetch(`/api/spots/${id}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  (validate(__filename, __line, result): SpotForUsers);
  return result;
}

