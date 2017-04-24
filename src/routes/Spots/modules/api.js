import fetch from 'isomorphic-fetch';
export async function getSpot (id) {
  const response = await fetch(`/api/spots/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}

export async function getSpotGallery (id) {
  const response = await fetch(`/api/spots/${id}/gallery`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}

