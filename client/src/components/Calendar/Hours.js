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
import Dialog from './Dialog';
const Hours = props => {
    const [value, setValue] = useState('Zajęte');
    const list_object = [
        {
            Id: '0',
            Hours_Start: '15:00',
            Hours_End: '16:30',
            Courts: 'A',
        },
        {
            Id: '1',
            Hours_Start: '16:30',
            Hours_End: '18:00',
            Courts: 'A',
        },
        {
            Id: '2',
            Hours_Start: '18:00',
            Hours_End: '19:30',
            Courts: 'A',
        },
        {
            Id: '3',
            Hours_Start: '19:30',
            Hours_End: '21:00',
            Courts: 'A',
        },
        {
            Id: '4',
            Hours_Start: '21:00',
            Hours_End: '22:30',
            Courts: 'A',
        },
        {
            Id: '5',
            Hours_Start: '15:00',
            Hours_End: '16:30',
            Courts: 'B',
        },
        {
            Id: '6',
            Hours_Start: '16:30',
            Hours_End: '18:00',
            Courts: 'B',
        },
        {
            Id: '7',
            Hours_Start: '18:00',
            Hours_End: '19:30',
            Courts: 'B',
        },
        {
            Id: '8',
            Hours_Start: '19:30',
            Hours_End: '21:00',
            Courts: 'B',
        },
        {
            Id: '9',
            Hours_Start: '21:00',
            Hours_End: '22:30',
            Courts: 'B',
        },
        {
            Id: '10',
            Hours_Start: '15:00',
            Hours_End: '16:30',
            Courts: 'C',
        },
        {
            Id: '11',
            Hours_Start: '16:30',
            Hours_End: '18:00',
            Courts: 'C',
        },
        {
            Id: '12',
            Hours_Start: '18:00',
            Hours_End: '19:30',
            Courts: 'C',
        },
        {
            Id: '13',
            Hours_Start: '19:30',
            Hours_End: '21:00',
            Courts: 'C',
        },
        {
            Id: '14',
            Hours_Start: '21:00',
            Hours_End: '22:30',
            Courts: 'C',
        },
        {
            Id: '15',
            Hours_Start: '15:00',
            Hours_End: '16:30',
            Courts: 'D',
        },
        {
            Id: '16',
            Hours_Start: '16:30',
            Hours_End: '18:00',
            Courts: 'D',
        },
        {
            Id: '17',
            Hours_Start: '18:00',
            Hours_End: '19:30',
            Courts: 'D',
        },
        {
            Id: '18',
            Hours_Start: '19:30',
            Hours_End: '21:00',
            Courts: 'D',
        },
        {
            Id: '19',
            Hours_Start: '21:00',
            Hours_End: '22:30',
            Courts: 'D',
        },
    ];
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='caption table'>
                <TableHead>
                    <TableRow>
                        <TableCell align='justify'>{HOURS_ROWS[1]}</TableCell>
                        <TableCell align='justify'>{HOURS_ROWS[2]}</TableCell>
                        <TableCell align='right'>{HOURS_ROWS[3]}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list_object.map(reservation => (
                        <TableRow hover={true} key={reservation.Id}>
                            <TableCell align='justify'>
                                {reservation.Hours_Start}
                            </TableCell>
                            <TableCell align='justify'>
                                {reservation.Courts}
                            </TableCell>{' '}
                            <TableCell align='right'>
                                {reservation.Hours_End}
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
