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
import { useSelector } from "react-redux";

const FewReservations = () => {
  const classes = useStyles();
  const listReservation = useSelector(
    (state) => state.calendar.reservationList
  );
  return (
    <div className={classes.betweenTable}>
      <TableContainer className={classes.table} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Dzień</TableCell>
              <TableCell align="center">Godzina</TableCell>
              <TableCell align="center">Strefa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listReservation.map(({ hour, start_time, courtId }, index) => {
              return (
                <TableRow hover={true} key={index}>
                  <TableCell align="center">{start_time}</TableCell>
                  <TableCell align="center">{hour}</TableCell>
                  <TableCell align="center">{courtId}</TableCell>
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
      {listReservation.length > 0 ? (
        <Button
          className={classes.button}
          size="large"
          variant="outlined"
          color="primary"
        >
          Rezerwuje i placę!
        </Button>
      ) : null}
    </div>
  );
};
export default FewReservations;
