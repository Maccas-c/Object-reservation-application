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

const defaultFormState = {
	id: FuseUtils.generateGUID(),
	title: '',
	start: moment(new Date(), 'MM/DD/YYYY'),
	end: moment(new Date(), 'MM/DD/YYYY'),
	desc: '',
	courtId: {
		courtName: ''
	}
};

function EventDialog(props) {
	const dispatch = useDispatch();
	const eventDialog = useSelector(({ calendarApp }) => calendarApp.events.eventDialog);
	const courts = useSelector(({ courtReducer }) => courtReducer.court);
	const defaultCourt = useSelector(({ courtReducer }) => courtReducer.defaultCourt);
	const { form, handleChange, setForm, setInForm } = useForm(defaultFormState);

	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (eventDialog.type === 'edit' && eventDialog.data) {
			setForm({ ...eventDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (eventDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...eventDialog.data,
				id: FuseUtils.generateGUID()
			});
		}
	}, [eventDialog.data, eventDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (eventDialog.props.open) {
			initDialog();
		}
	}, [eventDialog.props.open, initDialog]);

	function closeComposeDialog() {
		return eventDialog.type === 'edit' ? dispatch(closeEditEventDialog()) : dispatch(closeNewEventDialog());
	}

	function canBeSubmitted() {
		return form.title.length > 0;
	}

	function handleSubmit(event) {
		console.log(form);
		event.preventDefault();

		if (eventDialog.type === 'new') {
			dispatch(addEvent(form));
		}

		closeComposeDialog();
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

			<form noValidate onSubmit={handleSubmit}>
				<DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
					<TextField
						className="mt-8 mb-16"
						id="court"
						label="Sektor"
						select
						name="court"
						value={defaultCourt}
						onChange={handleChange}
						rows={5}
						variant="outlined"
						disabled={eventDialog.type !== 'new'}
						fullWidth
					>
						{courts.map(court => (
							<MenuItem key={court.nameCourt} value={court.nameCourt}>
								{court.nameCourt}
							</MenuItem>
						))}
					</TextField>
					<DateTimePicker
						label="Początek"
						inputVariant="outlined"
						value={form.start}
						onChange={date => {
							setInForm('start', date);
						}}
						className="mt-8 mb-16 w-full"
						disabled={eventDialog.type !== 'new'}
						maxDate={form.end}
					/>
					<DateTimePicker
						label="Koniec"
						inputVariant="outlined"
						value={form.end}
						onChange={date => {
							setInForm('end', date);
						}}
						className="mt-8 mb-16 w-full"
						disabled={eventDialog.type !== 'new'}
						minDate={form.start}
					/>
					<TextField
						className="mt-8 mb-16"
						id="desc"
						label="Dodatkowe informacje"
						type="text"
						name="desc"
						value={form.desc}
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
						<Button variant="contained" color="primary" type="submit" disabled={!canBeSubmitted()}>
							Dodaj do koszyka
						</Button>
					</DialogActions>
				) : (
					<DialogActions
						className="justify-between px-8 sm:px-16"
						style={{ justifyContent: 'center', paddingBottom: '20px' }}
					>
						<Button variant="contained" color="primary" type="submit" disabled={!canBeSubmitted()}>
							Zamknij
						</Button>
					</DialogActions>
				)}
			</form>
		</Dialog>
	);
}

export default EventDialog;
