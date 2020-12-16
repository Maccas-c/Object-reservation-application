import React from 'react';

import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import Logo from './Jabłko-dupa.jpg';

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

export const InvoicePDF = () => (
  <Document>
    <Page size={'A4'} style={styles.page}>
      <View style={styles.section}>
        <Text>
          <Image src={Logo} alt={'test'} />
        </Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);
