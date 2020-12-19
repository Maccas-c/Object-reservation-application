import React from 'react';

import { PDFDownloadLink } from '@react-pdf/renderer';
import { InvoicePDF } from './index';

export const Test = (props) => {
  return (
    <PDFDownloadLink document={<InvoicePDF {...{ props }} />} fileName={'somename.pdf'}>
      Generuj PDF
      {({ loading }) => (loading ? 'Loading document...' : 'Download now!')}
    </PDFDownloadLink>
  );
};
