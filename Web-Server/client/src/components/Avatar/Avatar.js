import React from 'react';
import useStyles from './AvatarStyles';

import Avatar from '@material-ui/core/Avatar';

const LetterAvatars = (props) => {
	const classes = useStyles();

	return (
		<div className={classes.root} onClick={props.clicked}>
			<Avatar src={props.src} className={classes.purple}></Avatar>
		</div>
	);
};

export default LetterAvatars;
