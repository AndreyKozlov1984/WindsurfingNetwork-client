import fetch from 'isomorphic-fetch';
export async function getPosts () {
  const response = await fetch('/api/posts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}

export async function getPost (id) {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}

