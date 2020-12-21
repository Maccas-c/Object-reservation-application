import React from 'react';

import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDFSchema } from './PDFSchema';

export const PDFDownload = ({ data }) => {
  return (
    <PDFDownloadLink document={<PDFSchema {...{ data }} />} fileName={'somename.pdf'}>
      {({ loading }) => (loading ? 'Generowanie PDF...' : 'Pobierz PDF!')}
    </PDFDownloadLink>
  );
};
