import FusePageCarded from '@fuse/core/FusePageCarded';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserListHeader from './UserListHeader';
import UserListTable from './UserListTable';
import { useConstructor } from '../../../../utils/customHooks';
import { fetchReservationUser } from '../../../../store/actions/userProfile';

function UserListReservation() {
	const dispatch = useDispatch();
	const id = useSelector(({ auth: { user } }) => user._id);
	const reservations = useSelector(({ userProfileReducer: { reservation } }) => reservation);

	useConstructor(() => {
		dispatch(fetchReservationUser(id));
	});

	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<UserListHeader reservations={reservations} />}
			content={<UserListTable reservations={reservations} />}
			innerScroll
		/>
	);
}

export default UserListReservation;
