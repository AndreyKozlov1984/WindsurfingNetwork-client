// @flow
import { fetch } from 'redux-auth';
import validate from '~/utils/validator';
import { type Spot, type SpotForGallery, type SpotForSchools } from './spots';
import { type User, type SpotForUsers } from './spotUsers';
import { type SpotForm, type SaveSpotResult, type Values } from './spotEdit';
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

export async function getSpotUsers (id: number, search: string): Promise<SpotForUsers> {
  const response = await fetch(`/api/spots/${id}/users?search=${search}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  (validate(__filename, __line, result): SpotForUsers);
  return result;
}

export async function getSpotUsersPage ({
  id,
  startIndex,
  stopIndex,
  search,
}: { id: number, search: string, startIndex: number, stopIndex: number }): Promise<User[]> {
  const response = await fetch(
    `/api/spots/${id}/users/page?search=${search}&
  offset=${startIndex}&limit=${stopIndex - startIndex}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const result = await response.json();
  (validate(__filename, __line, result): User[]);
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

export async function saveSpot (values: Values): Promise<SaveSpotResult> {
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

export async function rotate ({ direction, filename }: { direction: 'left' | 'right', filename: string }) {
  const response = await fetch(`/api/spots/rotate/${direction}/${filename}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  return result;
}

