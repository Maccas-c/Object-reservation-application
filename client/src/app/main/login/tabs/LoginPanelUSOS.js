import Button from '@material-ui/core/Button';
import auth0Service from 'app/services/auth0Service';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';

const LoginPanelUSOS = props => {
	const dispatch = useDispatch();

	useEffect(() => {
		showDialog();

		auth0Service.onAuthenticated(() => {
			dispatch(showMessage({ message: 'Logging in with Auth0' }));
		});
	}, [dispatch]);

	function showDialog() {
		auth0Service.login();
	}

	return (
		<div className="w-full">
			<Button className="w-full my-48" color="primary" variant="contained" onClick={showDialog}>
				Zaloguj z USOS
			</Button>
		</div>
	);
};

export default LoginPanelUSOS;
