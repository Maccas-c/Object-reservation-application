import React, { useState } from 'react';
import useStyles from './HoursStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { HOURS_ROWS } from '../../constants/calendar/HoursList';
import Button from '@material-ui/core/Button';
import Dialog from './Dialog';
const Hours = props => {
    const [value, setValue] = useState('Zajęte');

    const list_object = [
        { Id: '0', Hours: '15:00 - 16:30', Courts: 'A' },
        { Id: '1', Hours: '16:30 - 18:00', Courts: 'A' },
        { Id: '2', Hours: '18:00 - 19:30', Courts: 'A' },
        { Id: '3', Hours: '19:30 - 21:00', Courts: 'A' },
        { Id: '4', Hours: '21:00 - 22:30', Courts: 'A' },
        { Id: '5', Hours: '15:00 - 16:30', Courts: 'B' },
        { Id: '6', Hours: '16:30 - 18:00', Courts: 'B' },
        { Id: '7', Hours: '18:00 - 19:30', Courts: 'B' },
        { Id: '8', Hours: '19:30 - 21:00', Courts: 'B' },
        { Id: '9', Hours: '21:00 - 22:30', Courts: 'B' },
        { Id: '10', Hours: '15:00 - 16:30', Courts: 'C' },
        { Id: '11', Hours: '16:30 - 18:00', Courts: 'C' },
        { Id: '12', Hours: '18:00 - 19:30', Courts: 'C' },
        { Id: '13', Hours: '19:30 - 21:00', Courts: 'C' },
        { Id: '14', Hours: '21:00 - 22:30', Courts: 'C' },
        { Id: '15', Hours: '15:00 - 16:30', Courts: 'D' },
        { Id: '16', Hours: '16:30 - 18:00', Courts: 'D' },
        { Id: '17', Hours: '18:00 - 19:30', Courts: 'D' },
        { Id: '18', Hours: '19:30 - 21:00', Courts: 'D' },
        { Id: '19', Hours: '21:00 - 22:30', Courts: 'D' },
    ];
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='caption table'>
                <TableHead>
                    <TableRow>
                        <TableCell align='justify'>{HOURS_ROWS[1]}</TableCell>
                        <TableCell align='justify'>{HOURS_ROWS[2]}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list_object.map(reservation => (
                        <TableRow hover={true} key={reservation.Id}>
                            <TableCell align='justify'>
                                {reservation.Hours}
                            </TableCell>
                            <TableCell align='justify'>
                                {reservation.Courts}
                            </TableCell>

                            <TableCell align='right'>
                                <Dialog />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
export default Hours;
