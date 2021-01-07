import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://devcourt.projektstudencki.pl/api/',
  headers: { 'Cache-Control': 'no-cache' },
});

export default instance;
