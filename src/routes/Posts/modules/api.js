// @flow
import fetch from 'isomorphic-fetch';
import { type Post } from '../modules/posts';
export async function getPosts (): Promise<Post[]> {
  const response = await fetch('/api/posts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}

export async function getPost (id: number): Promise<Post> {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}

