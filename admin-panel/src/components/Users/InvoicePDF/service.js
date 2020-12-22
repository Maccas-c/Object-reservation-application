import jsPDF from 'jspdf';

import './fonts/AbhayaLibre-Regular-normal';

export const PDFDownloadService = () => {
  const print = (data) => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.setFont('AbhayaLibre-Regular', 'normal');

    const getFirstReservation = data[Object.keys(data)[0]];
    pdf.text(20, 20, `${getFirstReservation.userId.name} ${getFirstReservation.userId.surname}`);
    pdf.text(20, 30, `Adres: ${getFirstReservation.userId.adress_city}, ${getFirstReservation.userId.adress_street}`);
    pdf.text(20, 40, `Kod pocztowy: ${getFirstReservation.userId.adress_postalCode}`);
    pdf.text(20, 50, `NIP: ${getFirstReservation.userId.nip}`);
    pdf.text(20, 60, `E-mail: ${getFirstReservation.userId.email}`);
    pdf.text(20, 70, `Numer telefonu: ${getFirstReservation.userId.phone_number}`);

    let lineHelper = 90;
    pdf.text(20, lineHelper, `Rezerwacje:`);
    Object.entries(data).forEach(([, value]) => {
      lineHelper += 7;
      pdf.text(20, lineHelper, `${value.start_time}, ${value.hour}, sektor: ${value.courtId.toUpperCase()}`);
      if (lineHelper > 270) {
        lineHelper = 20;
        pdf.addPage();
      }
    });
    pdf.save('pdf');
  };

  return { print };
};
