import React from 'react';

import { Button, Dialog, DialogContent, IconButton } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import { useSummaryService } from './service';

const Summary = ({
  open,
  handleClickClose,
  listReservation,
  price,
  handleSubmitReservation,
}) => {
  const { classes, maxWidth, fullWidth } = useSummaryService();
  return (
    <Dialog
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      open={open}
      onClose={() => {
        handleClickClose();
      }}
      aria-labelledby="max-width-dialog-title"
    >
      <IconButton
        className={classes.iconButton}
        onClick={() => {
          handleClickClose();
        }}
      >
        <CloseIcon />
      </IconButton>
      <div>
        <h1 className={classes.summary}>{'Podsumowanie'}</h1> :
        <DialogContent>
          <h2>Cena: {price ? `${price} zł` : 'Czekaj...'}</h2>
          <h2>Ilość Rezerwacji: {listReservation.length}</h2>
        </DialogContent>
        <div className={classes.confirm}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => {
              handleClickClose();
            }}
          >
            Anuluj
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => (handleSubmitReservation())}
          >
            Potwierdź
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default Summary;
