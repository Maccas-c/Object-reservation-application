import React from 'react';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  AccordionSummary,
  Accordion,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';

import { useShopPanelService } from './service';

const ShopPanel = ({ price }) => {
  const {
    classes,
    listReservation,
    handleDeleteReservation,
    handleSubmitReservation,
    handleCancelReservations,
    expandHandler,
    isExpanded,
    getButtonContent,
  } = useShopPanelService();

  return (
    <>
      <Accordion {...{ className: classes.main, expanded: isExpanded }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          children={'Moje Rezerwacje'}
          aria-controls="panel1a-content"
          {...{
            id: 'panel1a-header',
            onClick: expandHandler,
          }}
        >
          <Typography className={classes.title}>Moje rezerwacje</Typography>
        </AccordionSummary>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Dzień</TableCell>
                <TableCell align="center">Godzina</TableCell>
                <TableCell align="center">Strefa</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listReservation.map(({ hour, start_time, courtId, uuid }) => {
                return (
                  <TableRow hover={true} key={uuid}>
                    <TableCell {...{ align: 'center' }}>{start_time}</TableCell>
                    <TableCell {...{ align: 'center' }}>{hour}</TableCell>
                    <TableCell {...{ align: 'center' }}>
                      {courtId.toUpperCase()}
                    </TableCell>
                    <TableCell {...{ align: 'center' }}>
                      <Button
                        startIcon={<DeleteIcon />}
                        {...{
                          onClick: () => handleDeleteReservation(uuid),
                          variant: 'contained',
                          size: 'small',
                          color: 'default',
                          style: { marginRight: '10px' },
                        }}
                      >
                        Usuń
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Accordion>
      <div {...{ className: classes.buttonsContainer }}>
        <Button
          {...{
            className: classes.buttonCancel,
            onClick: () => handleCancelReservations(),
            variant: 'contained',
            size: 'large',
            color: 'primary',
            disabled: !listReservation.length > 0,
          }}
        >
          Anuluj
        </Button>
        <Button
          {...{
            className: classes.buttonAccept,
            onClick: () => handleSubmitReservation(listReservation),
            variant: 'contained',
            size: 'large',
            color: 'primary',
            disabled: !listReservation.length > 0,
          }}
        >
          {getButtonContent(price)}
        </Button>
      </div>
    </>
  );
};
export default ShopPanel;
