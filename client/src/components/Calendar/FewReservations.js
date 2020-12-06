import React from "react";

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

import useStyles from "./TableStyles";
import { RESERVATIONS_TIMES } from "../../constants/calendar/reservetionListHelper";
import { useSelector } from "react-redux";

const FewReservations = () => {
  const classes = useStyles();
  const listReservation = useSelector(
    (state) => state.calendar.reservationList
  );
  console.log(listReservation);
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
            {listReservation.map((reservation, index) => {
              return (
                <TableRow hover={true} key={index}>
                  <TableCell align="center">{reservation.hour}</TableCell>
                  <TableCell align="center">
                    <Button
                      style={{ marginRight: "10px" }}
                      variant="outlined"
                      size="small"
                      color="primary"
                    >
                      Usuń Rezerwacje!
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default FewReservations;
