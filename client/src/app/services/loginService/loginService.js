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
						this.emit('onAutoLogout', 'Invalid access_token');
						this.setSession(null);
					}
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		const user = this.getUser();
		if (!user) {
			this.emit('onNoAccessToken');
			return;
		}
		if (this.isUserValid(user)) {
			this.setSession(user);
			this.emit('onAutoLogin', true);
		} else {
			this.setSession(null);
			this.emit('onAutoLogout', 'access_token expired');
		}
	};

	signInWithToken = () => {
		return new Promise((resolve, reject) => {
			const user = this.getUser();
			axios
				.post(`/api/checkUser`, user)
				.then(response => {
					if (response.data) {
						this.setSession(response.data);
						resolve(response.data);
					} else {
						this.logout();
						reject(new Error('Failed to login with token.'));
					}
				})
				.catch(error => {
					this.logout();
					reject(new Error('Failed to login with token.'));
				});
		});
	};

	createUser = data => {
		return new Promise((resolve, reject) => {
			axios.post('/api/auth/register', data).then(response => {
				if (response.data.user) {
					this.setSession(response.data.access_token);
					resolve(response.data.user);
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
					'https://devcourt.projektstudencki.pl/api/login',
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
						this.setSession(response.data);
						resolve(response.data);
					} else {
						reject(response.data.error);
					}
				});
		});
	};

	setSession = user => {
		if (user) {
			localStorage.setItem('user', JSON.stringify(user));
		} else {
			localStorage.removeItem('user');
			delete axios.defaults.headers.common.Authorization;
		}
	};

	logout = () => {
		this.setSession(null);
	};

	isUserValid = user => {
		if (!user) {
			console.warn('User is not login');
			return false;
		}

		return true;
	};

	getUser = () => {
		return JSON.parse(localStorage.getItem('user'));
	};
}

const instance = new LoginService();

export default instance;
