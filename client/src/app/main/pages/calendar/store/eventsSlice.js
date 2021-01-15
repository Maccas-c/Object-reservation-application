import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios/axios-auth';
import moment from 'moment';

export const dateFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ';

export const getEvents = createAsyncThunk('calendarApp/events/getEvents', async id => {
	const response = await axios.get(`reservations/${id}`);
	const data = await response.data;
	data.forEach(res => {
		res.title = `${res.courtId.nameCourt}: ${res.title}`;
	});

	return data;
});

export const addEvent = createAsyncThunk('calendarApp/events/addEvent', async (newEvent, { dispatch }) => {
	const response = await axios.post('/api/calendar-app/add-event', {
		newEvent
	});
	const data = await response.data;

	return data;
});

const eventsAdapter = createEntityAdapter({});

export const {
	selectAll: selectEvents,
	selectIds: selectEventIds,
	selectById: selectEventById
} = eventsAdapter.getSelectors(state => state.calendarApp.events);

const eventsSlice = createSlice({
	name: 'calendarApp/events',
	initialState: eventsAdapter.getInitialState({
		eventDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		openNewEventDialog: {
			prepare: event => {
				const payload = {
					type: 'new',
					props: {
						open: true
					},
					data: {
						start: moment(event.start).format(dateFormat).toString(),
						end: moment(event.end).format(dateFormat).toString()
					}
				};
				return { payload };
			},
			reducer: (state, action) => {
				state.eventDialog = action.payload;
			}
		},
		openEditEventDialog: {
			prepare: event => {
				const payload = {
					type: 'edit',
					props: {
						open: true
					},
					data: {
						...event,
						start: moment(event.start).format(dateFormat).toString(),
						end: moment(event.end).format(dateFormat).toString()
					}
				};
				return { payload };
			},
			reducer: (state, action) => {
				state.eventDialog = action.payload;
			}
		},
		closeNewEventDialog: (state, action) => {
			state.eventDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		closeEditEventDialog: (state, action) => {
			state.eventDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		}
	},
	extraReducers: {
		[getEvents.fulfilled]: eventsAdapter.setAll,
		[addEvent.fulfilled]: eventsAdapter.addOne
	}
});

export const {
	openNewEventDialog,
	closeNewEventDialog,
	openEditEventDialog,
	closeEditEventDialog
} = eventsSlice.actions;

export default eventsSlice.reducer;
