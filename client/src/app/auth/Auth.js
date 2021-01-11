import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import LoginService from 'app/services/login';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

import { setUserData, logoutUser } from './store/userSlice';

class Auth extends Component {
	state = {
		waitAuthCheck: true
	};

	componentDidMount() {
		return Promise.all([this.userCheck()]).then(() => {
			this.setState({ waitAuthCheck: false });
		});
	}

	userCheck = () =>
		new Promise(resolve => {
			LoginService.on('onAutoLogin', () => {
				/**
				 * Sign in and retrieve user data from Api
				 */
				LoginService.signWithSession()
					.then(user => {
						this.props.setUserData(user);
						resolve();
						this.props.showMessage({ message: 'Zalogowano' });
					})
					.catch(() => {
						// this.props.showMessage({ message: 'Błąd autoryzacji' });

						resolve();
					});
			});

			LoginService.on('onAutoLogout', message => {
				if (message) {
					this.props.showMessage({ message });
				}

				this.props.logout();

				resolve();
			});

			LoginService.on('onLogout', message => {
				if (message) {
					this.props.showMessage({ message: message.message });
				}

				resolve();
			});

			LoginService.init();

			return Promise.resolve();
		});

	render() {
		return this.state.waitAuthCheck ? <FuseSplashScreen /> : <>{this.props.children}</>;
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			logout: logoutUser,
			setUserData,
			showMessage,
			hideMessage
		},
		dispatch
	);
}

export default connect(null, mapDispatchToProps)(Auth);
