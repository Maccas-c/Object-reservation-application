import FuseUtils from '@fuse/utils/FuseUtils';

import axios from 'axios/axios-auth';

class LoginService extends FuseUtils.EventEmitter {
	init() {
		this.setInterceptors();
		this.handleAuthentication();
	}

	setInterceptors = () => {
		axios.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the user
						this.emit('onAutoLogout', 'Błąd autoryzacji, zostałeś wylogowany.');
					}
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		this.emit('onAutoLogin', true);
	};

	checkUserUSOS = () => {
		return new Promise((resolve, reject) => {
			axios.get('/loginUsos').then(response => {
				if (response.data) {
					resolve(response.data);
				} else {
					reject();
				}
			});
		});
	};

	signWithSession = () => {
		return new Promise((resolve, reject) => {
			axios
				.get(`/checkUser`)
				.then(response => {
					if (response.data._id) {
						resolve(response.data);
					} else {
						reject();
					}
				})
				.catch(error => {
					reject();
				});
		});
	};

	createUser = data => {
		return new Promise((resolve, reject) => {
			axios.post('/user/create', data).then(response => {
				if (response.data) {
					resolve(response.data);
				} else {
					reject(response.data.error);
				}
			});
		});
	};

	signInWithEmailAndPassword = (email, password) => {
		return new Promise((resolve, reject) => {
			axios
				.post(
					'/login',
					{
						email,
						password
					},
					{
						withCredentials: true
					}
				)
				.then(response => {
					if (response.data) {
						resolve(response.data);
					} else {
						reject(response.data.error);
					}
				});
		});
	};

	signInWithUSOS = () => {
		window.location.href = 'http://localhost:3001/api/loginUsos/connect';
	};
}

const instance = new LoginService();

export default instance;
