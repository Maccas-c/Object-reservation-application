import { TextFieldFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { updatePasswordStart } from '../../../auth/store/registerSlice';

function ResetPasswordPanel() {
	const dispatch = useDispatch();

	const [isFormValid, setIsFormValid] = useState(false);
	const formRef = useRef(null);
	const history = useHistory();

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		dispatch(updatePasswordStart(model));
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
					name="Hasło"
					label="Hasło"
					validations={{ minLength: 6 }}
					validationErrors={{
						isEmail: 'Hasło musi mieć minimum 6 znaków'
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

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto mt-16 normal-case"
					aria-label="REGISTER"
					disabled={!isFormValid}
					value="legacy"
				>
					Przypomnij hasło!
				</Button>
			</Formsy>
		</div>
	);
}

export default ResetPasswordPanel;