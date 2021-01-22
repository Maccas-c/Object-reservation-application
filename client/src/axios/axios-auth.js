import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://devcourt.projektstudencki.pl/api/',
	headers: { 'Cache-control': 'no-cache' },
	withCredentials: true
});

export default instance;
