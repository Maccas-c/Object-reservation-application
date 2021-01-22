import { fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

const httpClient = (url, options = {}) => {
  options.headers = new Headers({ Accept: 'application/json' });
  options.headers = new Headers({ Accept: 'Content-Type' });
  options.headers.set('Cache-Control', 'no-cache');

  const token = localStorage.getItem('token');
  options.headers.set('react-admin', token);
  return fetchUtils.fetchJson(url, options);
};
export const dataProvider = simpleRestProvider('http://localhost:3001/api/admin', httpClient);
