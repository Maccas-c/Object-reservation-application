import { TextFieldFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy, { addValidationRule } from 'formsy-react';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { updatePasswordStart } from '../../../auth/store/registerSlice';

function ResetPasswordPanel() {
	const dispatch = useDispatch();

	addValidationRule('isPassword', ({ password }) => {
		if (password) {
			return password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);
		}
		return null;
	});
	const [isFormValid, setIsFormValid] = useState(false);
	const formRef = useRef(null);
	const history = useHistory();
	const { id } = useParams();
	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		dispatch(updatePasswordStart(model, id));
		history.push('/login');
	}

	return (
		<div className="w-full">
			<Formsy
				onValidSubmit={handleSubmit}
				onValid={enableButton}
				onInvalid={disableButton}
				ref={formRef}
				className="flex flex-col justify-center w-full"
			>
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="email"
					label="Email"
					validations="isEmail"
					validationErrors={{
						isEmail: 'Wpisz poprawny email!'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									email
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>
				<TextFieldFormsy
					className="mb-16"
					type="password"
					name="password"
					label="Hasło"
					validations="isPassword:password"
					validationErrors={{
						isPassword:
							'    Hasło musi się składać z co najmniej 6 i co najwyżej 20 znaków. Prawidłowe hasło musi zawierać co najmniej jedną małą literę, co najmniej jedna duża literę, jeden znak specjalny oraz jedną cyfrę.\n',
						equalsField: 'Hasło nie jest takie samo.'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									vpn_key
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto mt-16 normal-case"
					aria-label="REGISTER"
					disabled={!isFormValid}
					value="legacy"
				>
					Zmień hasło!
				</Button>
			</Formsy>
		</div>
	);
}

export default ResetPasswordPanel;
