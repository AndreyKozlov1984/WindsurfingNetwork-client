// @flow
import fetch from 'isomorphic-fetch';
import { type Spot, type SpotForGallery, type SpotForUsers } from './spots';
export async function getSpot (id: number): Promise<Spot> {
  const response = await fetch(`/api/spots/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}

export async function getSpotGallery (id: number): Promise<SpotForGallery> {
  const response = await fetch(`/api/spots/${id}/gallery`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}

export async function getSpotUsers (id: number): Promise<SpotForUsers> {
  const response = await fetch(`/api/spots/${id}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}

