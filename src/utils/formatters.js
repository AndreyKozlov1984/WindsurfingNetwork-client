// @flow
import moment from 'moment';
export function formatDate (input: string): string {
  return moment(input).format('DD.MM.YYYY');
}
export function formatDateTime (input: string): string {
  return moment(input).format('DD.MM.YYYY HH:mm');
}

export const centerStyles = {
  margin: 0,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export function monthByNumber (month: number): string {
  return moment((+month + 1).toString(), 'MM').format('MMMM');
}

