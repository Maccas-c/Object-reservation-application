import React from 'react';

import _ from 'lodash';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';

import { PDFDownloadService } from './service';

export const PDFDownload = ({ data }) => {
  const { print } = PDFDownloadService();
  const history = useHistory();

  const content = !_.isEmpty(data) ? (
    <Button
      {...{
        onClick: () => {
          print(data);
          history.push('/users');
        },
        type: 'button',
        variant: 'contained',
        color: 'primary',
        size: 'small',
      }}
    >
      PDF
    </Button>
  ) : null;

  return content;
};
