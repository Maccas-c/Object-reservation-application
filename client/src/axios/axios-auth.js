import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/api/',
  headers: { 'Cache-Control': 'no-cache' }
});

export default instance;
