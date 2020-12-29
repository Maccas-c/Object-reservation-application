import React from 'react';

import { IconButton } from '@material-ui/core';

import PDF from '@assets/regulations/regulations.pdf';

import { useRegulationsService } from './styles';

const Regulations = () => {
  const { classes } = useRegulationsService();

  return (
    <IconButton>
      <a className={classes.title} href={PDF}>
        Regulamin
      </a>
    </IconButton>
  );
};

export default Regulations;
