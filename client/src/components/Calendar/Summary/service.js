import { useState } from 'react';

import { useSelector } from 'react-redux';

import useStyles from './styles';

export const useSummaryService = () => {
  const classes = useStyles();

  const link = useSelector(({ payment: { link } }) => link);

  const [maxWidth] = useState('sm');
  const [fullWidth] = useState(true);

  return {
    classes,
    link,
    maxWidth,
    fullWidth,
  };
};
