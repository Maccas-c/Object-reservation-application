import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeNewEventDialog, closeEditEventDialog } from './store/eventsSlice';
import { Form, Formik } from 'formik';
import { getDay, getId } from './utils';
import { getFreeTimes, setCourt } from '../../../../store/actions/courts';
import { addReservation } from '../../../../store/actions/calendar';

function EventDialog(props) {
	const dispatch = useDispatch();
	const eventDialog = useSelector(({ calendarApp }) => calendarApp.events.eventDialog);
	const courts = useSelector(({ courtReducer }) => courtReducer.court);
	const userId = useSelector(({ auth }) => auth.user._id);
	const defaultCourt = useSelector(({ courtReducer }) => courtReducer.defaultCourt);
	const freeTimes = useSelector(({ courtReducer }) => courtReducer.freeTimes);

	const [selectedTime, setSelectedTime] = useState(null);

	useEffect(() => {}, []);

	function closeComposeDialog() {
		return eventDialog.type === 'edit' ? dispatch(closeEditEventDialog()) : dispatch(closeNewEventDialog());
	}

	if (freeTimes && !selectedTime) {
		const timesHelper = freeTimes.reverse();
		timesHelper.forEach(time => {
			if (time.free) {
				setSelectedTime(time.durationTime);
			}
		});
	}

	const id = getId(courts, defaultCourt);

	return (
		<Dialog
			{...eventDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
			component="form"
			classes={{
				paper: 'rounded-8'
			}}
		>
			<AppBar position="static">
				<Toolbar className="flex w-full" style={{ justifyContent: 'center' }}>
					<Typography variant="subtitle1" color="inherit">
						{eventDialog.type === 'new' ? 'Nowa rezerwacja' : 'Podgląd'}
					</Typography>
				</Toolbar>
			</AppBar>

			<Formik
				enableReinitialize
				initialValues={{ courtId: defaultCourt, time: selectedTime }}
				onSubmit={(values, actions) => {
					dispatch(addReservation(values.time, id, userId, eventDialog.data.start));
					dispatch(closeNewEventDialog());
				}}
				render={({ handleSubmit, handleChange, handleBlur, values }) => (
					<Form onSubmit={handleSubmit}>
						<DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
							<TextField
								className="mt-8 mb-16"
								id="court"
								label="Sektor"
								select
								name="court"
								value={values.courtId}
								onChange={({ target }) => {
									dispatch(setCourt(target.value));
									dispatch(getFreeTimes(target.value, eventDialog.data.start));
								}}
								rows={5}
								variant="outlined"
								disabled={eventDialog.type !== 'new'}
								fullWidth
							>
								{courts.map(court =>
									court.date.map(day => {
										if (eventDialog.data) {
											if (
												day.value &&
												day.nameOfDay === getDay(new Date(eventDialog.data.start).getDay())
											) {
												return (
													<MenuItem key={court.nameCourt} value={court.nameCourt}>
														{court.nameCourt}
													</MenuItem>
												);
											}
										}
										return null;
									})
								)}
							</TextField>
							<TextField
								className="mt-8 mb-16"
								id="court"
								label="Wolne godziny"
								select
								name="court"
								value={values.time || ''}
								onChange={({ target }) => {
									setSelectedTime(target.value);
								}}
								rows={5}
								variant="outlined"
								disabled={eventDialog.type !== 'new'}
								fullWidth
							>
								{freeTimes.map(time => {
									if (time.free) {
										return (
											<MenuItem key={time.durationTime} value={time.durationTime}>
												{time.durationTime}
											</MenuItem>
										);
									}
									return null;
								})}
							</TextField>
							<TextField
								className="mt-8 mb-16"
								id="desc"
								label="Dodatkowe informacje"
								type="text"
								name="desc"
								value={''}
								onChange={handleChange}
								multiline
								rows={5}
								variant="outlined"
								disabled={eventDialog.type !== 'new'}
								fullWidth
							/>
						</DialogContent>

						{eventDialog.type === 'new' ? (
							<DialogActions
								className="justify-between px-8 sm:px-16"
								style={{ justifyContent: 'center', paddingBottom: '20px' }}
							>
								<Button variant="contained" color="primary" type="submit">
									Dodaj do koszyka
								</Button>
							</DialogActions>
						) : (
							<DialogActions
								className="justify-between px-8 sm:px-16"
								style={{ justifyContent: 'center', paddingBottom: '20px' }}
							>
								<Button variant="contained" color="primary" type="submit">
									Zamknij
								</Button>
							</DialogActions>
						)}
					</Form>
				)}
			/>
		</Dialog>
	);
}

export default EventDialog;
