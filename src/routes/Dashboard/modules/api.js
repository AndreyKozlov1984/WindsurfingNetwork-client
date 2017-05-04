// @flow
import fetch from 'isomorphic-fetch';
import { type DashboardData, type LookupData, type Filters } from './dashboard';
export async function getDashboardContent (filters: Filters): Promise<DashboardData> {
  const response = await fetch('/api/dashboard', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filters),
  });
  return await response.json();
}

export async function getLookupData (): Promise<LookupData> {
  const response = await fetch('/api/dashboard/init', {});
  return await response.json();
}

