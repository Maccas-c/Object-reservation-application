import React, { forwardRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { MENU_ROUTES } from '../../constants/routes/routes';
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

const AlertDialogSlide = props => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                variant='outlined'
                color='primary'
                onClick={handleClickOpen}>
                Zarezerwuj!
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}>
                <DialogTitle id='alert-dialog-slide-title'>
                    {'Potwierdzenie rezerwacji'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
                        Czy jesteś pewny,że chcesz zarezerwować boisko?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Tak
                    </Button>
                    <Button onClick={handleClose} color='primary'>
                        Nie
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default AlertDialogSlide;
