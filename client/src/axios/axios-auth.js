import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://devcourt.projektstudencki.pl/api/',
  headers: { 'Cache-Control': 'no-cache' }
});

export default instance;
