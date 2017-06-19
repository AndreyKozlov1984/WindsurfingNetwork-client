// @flow
import fetch from 'isomorphic-fetch';
import validate from '~/utils/validator';
import { type Spot, type DashboardData, type LookupData, type Filters } from './dashboard';

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
export async function getSpotsPage ({
  filters,
  startIndex,
  stopIndex,
}: {
  filters: Filters,
  startIndex: number,
  stopIndex: number,
}): Promise<Spot[]> {
  const response = await fetch('/api/dashboard/spots/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filters,
      offset: Math.max(startIndex, 0),
      limit: stopIndex - startIndex + 1,
    }),
  });
  const result = await response.json();
  (validate(__filename, __line, result): Spot[]);
  return result;
}

export async function getLookupData (): Promise<LookupData> {
  const response = await fetch('/api/dashboard/init', {});
  const result = await response.json();
  (validate(__filename, __line, result): LookupData);
  return result;
}

