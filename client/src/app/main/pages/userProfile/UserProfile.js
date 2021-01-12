import FuseAnimate from '@fuse/core/FuseAnimate';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import AnalogClock from 'analog-clock-react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import useStyles, { options } from './styles';
import { updateUserProfileStart } from '../../../../store/actions/userProfile';
import { userProfileTransform } from '../../../services/validation/initialValuesValidation';
import { userProfileEdit } from '../../../services/validation/validationSchema';

function UserProfile() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const createDate = useSelector(({ auth: { user } }) => user.createDate);
	const userProfile = useSelector(({ auth: { user } }) => user);
	const [results, setResults] = useState(0);
	const [formValues, setFormValues] = useState('');

	useEffect(() => {
		const oneDay = 24 * 60 * 60 * 1000;
		let diffDays = Math.round(Math.abs((new Date().getTime() - new Date(createDate).getTime()) / oneDay));
		if (diffDays === 0) {
			diffDays = 1;
		}
		setResults(diffDays);
	}, [createDate]);

	useEffect(() => {
		if (userProfile) {
			setFormValues(userProfile);
		}
	}, [dispatch, userProfile]);

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
							<Formik
								enableReinitialize
								initialValues={userProfileTransform(formValues)}
								validationSchema={userProfileEdit}
								onSubmit={(values, actions) => {
									dispatch(updateUserProfileStart(values));
									actions.setSubmitting(false);
								}}
								render={({
									handleSubmit,
									handleChange,
									handleBlur,
									errors: { adress_postalCode, age, nip, phone_number, email },
									values: {
										adress_city,
										adress_postalCode: adress_postalCode1,
										adress_street,
										age: age1,
										email: email1,
										name,
										nip: nip1,
										phone_number: phone_number1,
										surname
									}
								}) => (
									<Form onSubmit={handleSubmit}>
										<TextField
											className="mb-16"
											label="Imię"
											name="name"
											disabled={userProfile?.isStudent ?? null}
											onBlur={handleBlur}
											onChange={handleChange}
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
											disabled={userProfile?.isStudent ?? null}
											onBlur={handleBlur}
											onChange={handleChange}
											value={surname}
											variant="outlined"
											required
											fullWidth
										/>
										<TextField
											className="mb-16"
											label="E-mail"
											disabled={userProfile?.isStudent ?? null}
											type="email"
											name="email"
											variant="outlined"
											required
											onBlur={handleBlur}
											onChange={handleChange}
											error={email}
											value={email1}
											helperText={email}
											fullWidth
										/>
										<TextField
											className="mb-16"
											name="phone_number"
											type="number"
											label="Numer telefonu"
											id="phone_number"
											helperText={phone_number}
											error={phone_number}
											onBlur={handleBlur}
											onChange={handleChange}
											value={phone_number1}
											variant="outlined"
											fullWidth
										/>
										<TextField
											className="mb-16"
											name="age"
											label="Wiek"
											type="number"
											helperText={age}
											error={age}
											id="age"
											onBlur={handleBlur}
											onChange={handleChange}
											value={age1}
											variant="outlined"
											fullWidth
										/>
										<TextField
											className="mb-16"
											name="adress_city"
											label="Miasto"
											id="city"
											onBlur={handleBlur}
											onChange={handleChange}
											value={adress_city}
											variant="outlined"
											fullWidth
										/>
										<TextField
											className="mb-16"
											name="adress_postalCode"
											helperText={adress_postalCode}
											error={adress_postalCode}
											label="Kod pocztowy"
											id="adress_postalCode"
											onBlur={handleBlur}
											onChange={handleChange}
											value={adress_postalCode1}
											variant="outlined"
											fullWidth
										/>
										<TextField
											className="mb-16"
											name="adress_street"
											label="Ulica"
											id="adress_street"
											onBlur={handleBlur}
											onChange={handleChange}
											value={adress_street}
											variant="outlined"
											fullWidth
										/>
										<TextField
											className="mb-16"
											name="nip"
											label="NIP"
											id="nip"
											error={nip}
											helperText={nip}
											onBlur={handleBlur}
											onChange={handleChange}
											value={nip1}
											variant="outlined"
											fullWidth
										/>

										<Button
											variant="contained"
											color="primary"
											style={{ display: 'flex', justifyContent: 'center' }}
											className="w-224 mx-auto mt-16"
											aria-label="Reset"
											type="submit"
										>
											Zapisz
										</Button>
									</Form>
								)}
							/>
						</CardContent>
					</Card>
				</FuseAnimate>
			</div>
		</div>
	);
}
export default UserProfile;
