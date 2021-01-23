import jsPDF from 'jspdf';
import { dataProvider } from '../../dataprovider';
import './fonts/AbhayaLibre-Regular-normal';

export const PDFDownloadService = () => {
  const print = (data) => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.setFont('AbhayaLibre-Regular', 'normal');

    const getFirstReservation = data[Object.keys(data)[0]];
    pdf.text(20, 20, `${getFirstReservation.userId.name} ${getFirstReservation.userId.surname}`);
    pdf.text(
      20,
      30,
      `Adres: ${getFirstReservation.userId ? getFirstReservation.userId.adress_city : ' nie podano '} ${
        getFirstReservation.userId ? getFirstReservation.userId.adress_street : 'nie podano'
      }`
    );

    pdf.text(
      20,
      40,
      `Kod pocztowy: ${
        getFirstReservation.userId.adress_postalCode ? getFirstReservation.userId.adress_postalCode : 'nie podano'
      }`
    );
    pdf.text(20, 50, `NIP: ${getFirstReservation.userId.nip ? getFirstReservation.userId.nip : 'nie podano'}`);
    pdf.text(20, 60, `E-mail: ${getFirstReservation.userId.email}`);
    pdf.text(
      20,
      70,
      `Numer telefonu: ${
        getFirstReservation.userId.phone_number ? getFirstReservation.userId.phone_number : 'nie podano'
      }`
    );
    pdf.text(20, 80, `Cena : ${getFirstReservation.price}`);
    let lineHelper = 90;
    pdf.text(20, lineHelper, `Rezerwacje:`);
    Object.entries(data).forEach(([, value]) => {
      lineHelper += 7;
      pdf.text(
        20,
        lineHelper,
        `${value.dayString}, ${value.title}, sektor: ${value.courtId.nameCourt}, cena: ${value.price}zł`
      );
      if (lineHelper > 270) {
        lineHelper = 20;
        pdf.addPage();
      }
    });
    const tab = [];
    Object.entries(data).forEach(([, value]) => {
      tab.push(value.id);
    });
    pdf.save(`Dane-${getFirstReservation.userId.name}-${getFirstReservation.userId.surname}`);
    dataProvider.updateMany('reservations/update', {
      ids: tab,
    });
  };

  return { print };
};
