import React, {useState} from 'react';

import {Button, Dialog, DialogContent, IconButton,} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import useStyles from "./styles";


const Summary = ({open, handleClickClose, listReservation, price,handleSubmitReservation}) => {
    const classes = useStyles()
    const [maxWidth] = useState('sm');
    const [fullWidth] = useState(true);
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
                <CloseIcon/>
            </IconButton>
            <div>
                <h1 className={classes.summary}>{'Podsumowanie'}</h1> :
                <DialogContent>
                    <h2>Cena: {price ? `${price} zł` : 'Czekaj...'}</h2>
                    <h2>Ilość Rezerwacji: {listReservation.length}</h2>
                </DialogContent>
                <div className={classes.confirm}>
                    <Button
                        color='primary'
                        variant='outlined'
                        onClick = {()=>{handleClickClose()}}
                    >
                        Anuluj
                    </Button>
                    <Button
                        color='primary'
                        variant='contained'
                        onClick = {()=>{handleSubmitReservation(listReservation)}}
                    >
                        Potwierdź
                    </Button>
                </div>
            </div>
        </Dialog>
    );
};

export default Summary;

