import React from 'react';

import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export const PDFSchema = (data) => {
  const getObjectOfReservations = data[Object.keys(data)[0]];
  const getSingleReservation = getObjectOfReservations[Object.keys(getObjectOfReservations)[0]];

  return (
    <Document>
      <Page size={'A4'} style={styles.page}>
        <View style={styles.section}>
          <Text>{`Jebane id rezerwacji: ${getSingleReservation.id}`}</Text>
        </View>
      </Page>
    </Document>
  );
};
