import FuseAnimate from '@fuse/core/FuseAnimate';
import { useForm } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import AnalogClock from 'analog-clock-react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfileStart } from '../../../../store/actions/userProfile';

const options = {
	width: '100px',
	border: true,
	borderColor: '#2e2e2e',
	baseColor: '#ffffff',
	centerColor: '#101E2A',
	centerBorderColor: '#fff',
	handColors: {
		second: '#101E2A',
		minute: '#101E2A',
		hour: '#101E2A'
	}
};
const useStyles = makeStyles(theme => ({
	root: {
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
		color: theme.palette.primary.contrastText
	}
}));

function UserProfile() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const createDate = useSelector(({ auth: { user } }) => user.createDate);
	const { adress_city, adress_postalCode, adress_street, age, email, name, nip, phone_number, surname } = useSelector(
		({ auth: { user } }) => user
	);
	const { form, handleChange, resetForm } = useForm({
		password: ''
	});
	const [results, setResults] = useState(0);

	useEffect(() => {
		const oneDay = 24 * 60 * 60 * 1000;
		let diffDays = Math.round(Math.abs((new Date().getTime() - new Date(createDate).getTime()) / oneDay));
		if (diffDays === 0) {
			diffDays = 1;
		}
		setResults(diffDays);
	}, []);

	const user = {
		id: '5ffcd6b6786f59191c52c6a0',
		email: 'piotr69@gmail.com',
		name: 'Maciej',
		surname: 'Tromba'
	};
	function handleSubmit(ev) {
		ev.preventDefault();
		dispatch(updateUserProfileStart(user));
	}

	const formatDayString = day => (day !== 1 ? 'dni' : 'dzień');

	return (
		<div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32')}>
			<div className="flex flex-col items-center justify-center w-full">
				<FuseAnimate animation="transition.expandIn">
					<Card className="w-full max-w-sm">
						<CardContent className="flex flex-col items-center justify-center p-32">
							<div className="min-w-full flex flex-col items-center justify-center sm:flex-row sm:justify-start sm:items-center -mx-8">
								<div className="relative mx-8">
									<AnalogClock {...options} />
								</div>

								<div className="mx-8">
									<Typography variant="h6" className="mb-8">
										Witaj,
									</Typography>
									<Typography color="textSecondary">{`Jesteś z nami już ${results} ${formatDayString(
										results
									)} :)`}</Typography>
								</div>
							</div>
							<form
								name="lockForm"
								noValidate
								className="flex flex-col justify-center w-full mt-32"
								onSubmit={handleSubmit}
							>
								<TextField
									className="mb-16"
									label="Imię"
									name="name"
									value={name}
									variant="outlined"
									fullWidth
									required
								/>

								<TextField
									className="mb-16"
									label="Nazwisko"
									type="surname"
									name="surname"
									value={surname}
									onChange={handleChange}
									variant="outlined"
									required
									fullWidth
								/>
								<TextField
									className="mb-16"
									label="E-mail"
									type="email"
									name="email"
									value={email}
									onChange={handleChange}
									variant="outlined"
									required
									fullWidth
								/>
								<TextField
									className="mb-16"
									label="Numer telefonu"
									type="phoneNumber"
									name="phone_number"
									value={phone_number}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
								<TextField
									className="mb-16"
									label="Wiek"
									type="number"
									name="age"
									value={age}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
								<TextField
									className="mb-16"
									label="Miasto"
									type="string"
									name="adress_city"
									value={adress_city}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
								<TextField
									className="mb-16"
									label="Kod pocztowy"
									type="string"
									name="adress_postalCode"
									value={adress_postalCode}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
								<TextField
									className="mb-16"
									label="Ulica"
									type="string"
									name="adress_street"
									value={adress_street}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
								<TextField
									className="mb-16"
									label="NIP"
									type="string"
									name="nip"
									value={nip}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>

								<Button
									variant="contained"
									color="primary"
									className="w-224 mx-auto mt-16"
									aria-label="Reset"
									type="submit"
								>
									Zapisz
								</Button>
							</form>
						</CardContent>
					</Card>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default UserProfile;
