// @flow
import fetch from 'isomorphic-fetch';
import validate from '~/utils/validator';
import { type Spot, type SpotForGallery, type SpotForUsers, type SpotForSchools } from './spots';
import { type SpotForm, type SaveSpotResult } from './spotEdit';
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

export async function getSpotSchools (id: number): Promise<SpotForSchools> {
  const response = await fetch(`/api/spots/${id}/schools`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  (validate(__filename, __line, result): SpotForSchools);
  return result;
}

export async function getSpotForm (id: number): Promise<SpotForm> {
  const response = await fetch(`/api/spots/${id}/edit`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  (validate(__filename, __line, result): SpotForm);
  return result;
}

export async function saveSpot (values: any): Promise<SaveSpotResult> {
  try {
    const response = await fetch(`/api/spots/${values.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    const result = await response.json();
    (validate(__filename, __line, result): SaveSpotResult);
    return result;
  } catch (e) {
    return {
      status: 'error',
      errors: { _error: 'Request failed' },
    };
  }
}

