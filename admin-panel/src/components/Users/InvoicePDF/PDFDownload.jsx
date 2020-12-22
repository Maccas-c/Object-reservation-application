import React from 'react';

import _ from 'lodash';

import { PDFDownloadService } from './service';

export const PDFDownload = ({ data }) => {
  const { print } = PDFDownloadService();

  const content = !_.isEmpty(data) ? <button {...{ onClick: () => print(data), type: 'button' }}>PDF</button> : null;

  return content;
};
