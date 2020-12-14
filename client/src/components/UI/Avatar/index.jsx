import React from 'react';

import Avatar from '@material-ui/core/Avatar';

import useStyles from './styles';

const LetterAvatars = ({ src }) => {
  const classes = useStyles();

  return (
    <div {...{ className: classes.root }}>
      <Avatar {...{ src, className: classes.purple }} />
    </div>
  );
};

export default LetterAvatars;
