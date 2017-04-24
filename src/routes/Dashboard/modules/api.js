import fetch from 'isomorphic-fetch';
export async function getDashboardContent (filters) {
  const response = await fetch('/api/dashboard', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filters),
  });
  return await response.json();
}

export async function getLookupData () {
  const response = await fetch('/api/dashboard/init', {});
  return await response.json();
}

