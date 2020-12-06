import React from "react";

import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";

import useStyles from './TableStyles';
import {RESERVATIONS_TIMES} from "../../constants/calendar/reservetionListHelper";

const FewReservations = () => {
    const classes = useStyles()
    return (
        <div className={classes.betweenTable}>
        <TableContainer className={classes.table} component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Godzina</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {RESERVATIONS_TIMES.map(({id, isActive, reservationTime}) => {
                        if (isActive) {
                            return (
                                <TableRow hover={true} key={id}>
                                    <TableCell align="center">
                                        {reservationTime}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button style={{marginRight: '10px'}} variant="outlined" size='small'
                                                color='primary'>Usuń Rezerwacje!</Button>
                                    </TableCell>
                                </TableRow>
                            );
                        } else {
                            return null;
                        }
                    })}
                    <Button variant="outlined" size='small'
                            color='primary'>ok</Button>
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    )
}
export default FewReservations