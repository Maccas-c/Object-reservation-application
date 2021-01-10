import React from 'react';

import Button from '@material-ui/core/Button';

import { loginUSOS } from 'app/auth/store/loginSlice';

const LoginPanelUSOS = props => {
	return (
		<div className="w-full">
			<Button className="w-full my-48" color="primary" variant="contained" onClick={() => loginUSOS()}>
				Zaloguj z USOS
			</Button>
		</div>
	);
};

export default LoginPanelUSOS;
