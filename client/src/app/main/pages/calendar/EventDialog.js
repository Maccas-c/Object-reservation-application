import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { DateTimePicker } from '@material-ui/pickers';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent, closeNewEventDialog, closeEditEventDialog } from './store/eventsSlice';
import { Form, Formik } from 'formik';
import { getDay } from './utils';
import { setCourt } from '../../../../store/actions/courts';

function EventDialog(props) {
	const dispatch = useDispatch();
	const eventDialog = useSelector(({ calendarApp }) => calendarApp.events.eventDialog);
	const courts = useSelector(({ courtReducer }) => courtReducer.court);
	const defaultCourt = useSelector(({ courtReducer }) => courtReducer.defaultCourt);

	useEffect(() => {}, []);

	function closeComposeDialog() {
		return eventDialog.type === 'edit' ? dispatch(closeEditEventDialog()) : dispatch(closeNewEventDialog());
	}

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
				initialValues={{ courtId: defaultCourt }}
				onSubmit={(values, actions) => {
					console.log(values);
					closeComposeDialog();
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
									console.log(target);
									dispatch(setCourt(target.value));
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
									})
								)}
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
