// @flow
import fetch from 'isomorphic-fetch';
import validate from '~/utils/validator';
import { type DashboardData, type LookupData, type Filters } from './dashboard';
export async function getDashboardContent (filters: Filters): Promise<DashboardData> {
  const response = await fetch('/api/dashboard', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filters),
  });
  const result = await response.json();
  (validate(__filename, __line, result): DashboardData);
  return result;
}

export async function getLookupData (): Promise<LookupData> {
  const response = await fetch('/api/dashboard/init', {});
  const result = await response.json();
  (validate(__filename, __line, result): LookupData);
  return result;
}

