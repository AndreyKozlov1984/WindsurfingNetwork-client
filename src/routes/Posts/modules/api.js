// @flow
import fetch from 'isomorphic-fetch';
import validate from '~/utils/validator';
import { type Post } from '../modules/posts';
export async function getPosts (): Promise<Post[]> {
  const response = await fetch('/api/posts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  (validate(__filename, __line, result): Post[]);
  return result;
}

export async function getPost (id: number): Promise<Post> {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  (validate(__filename, __line, result): Post);
  return result;
}

