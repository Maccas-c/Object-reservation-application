import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Widget from './widget/Widget';
import { useConstructor } from '../../../../utils/customHooks';
import { fetchReservationUser } from '../../../../store/actions/userProfile';

const UserListReservation = () => {
	const dispatch = useDispatch();
	const id = useSelector(({ auth: { user } }) => user._id);
	const reservations = useSelector(({ userProfileReducer: { reservation } }) => reservation);

	useConstructor(() => {
		dispatch(fetchReservationUser(id));
	});
	return (
		<FuseAnimateGroup
			className="flex flex-wrap"
			enter={{
				animation: 'transition.slideUpBigIn'
			}}
		>
			<div className="widget flex w-full p-12">
				<Widget reservations={reservations} />
			</div>
		</FuseAnimateGroup>
	);
};
export default UserListReservation;
