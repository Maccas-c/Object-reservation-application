import React, {useState} from 'react';

import {Dialog, DialogContent, DialogContentText, IconButton,} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';


const Summary = ({open, handleClickClose,listReservation}) => {
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
                style={{marginLeft:'92%'}}
                onClick={() => {
                    handleClickClose();
                }}
            >
                <CloseIcon />
            </IconButton>
            <div>
                <h1 style={{display:'flex',justifyContent:'center'}}>{'Podsumowanie'}</h1> :
                <DialogContent>
                    <h2>Cena:</h2>
                    <h2>Ilość Rezerwacji:{listReservation.length}</h2>
                </DialogContent>
            </div>
        </Dialog>
    );
};

export default Summary;

