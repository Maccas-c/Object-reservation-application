import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:3001/api/',
	headers: { 'Cache-control': 'no-cache' },
	withCredentials: true
});

export default instance;
