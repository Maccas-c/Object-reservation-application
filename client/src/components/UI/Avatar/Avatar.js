import React from 'react';

import Avatar from '@material-ui/core/Avatar';

import useStyles from './AvatarStyles';

const LetterAvatars = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar src={props.src} className={classes.purple}></Avatar>
    </div>
  );
};

export default LetterAvatars;
