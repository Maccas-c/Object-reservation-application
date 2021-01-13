import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import React from 'react';

function UserListHeader({ reservations }) {
	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">playlist_add_check</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						Historia rezerwacji
					</Typography>
				</FuseAnimate>
			</div>
			<FuseAnimate animation="transition.slideRightIn" delay={300}>
				<div className="flex items-center justify-between px-16 h-64 border-b-1">
					<Typography className="text-11 font-500 rounded-4 text-white bg-blue px-8 py-4">
						{reservations.length} rezerwacji
					</Typography>
				</div>
			</FuseAnimate>
		</div>
	);
}

export default UserListHeader;
