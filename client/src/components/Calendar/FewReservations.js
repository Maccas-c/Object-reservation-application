import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  AccordionSummary,
  Accordion,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useStyles from "./TableStyles";

import * as calendarActions from "../../store/actions/index";

const FewReservations = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const listReservation = useSelector(
    ({ calendar }) => calendar.reservationList
  );

  const handleDeleteReservation = (uuid) => {
    dispatch(calendarActions.deleteReservationToList(uuid));
  };
  return (
    <div className={classes.betweenTable}>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.title}>Moje rezerwacje</Typography>
        </AccordionSummary>
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
              {listReservation.map(({ hour, start_time, courtId, uuid }) => {
                return (
                  <TableRow hover={true} key={uuid}>
                    <TableCell align="center">{start_time}</TableCell>
                    <TableCell align="center">{hour}</TableCell>
                    <TableCell align="center">
                      {courtId.toUpperCase()}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => {
                          handleDeleteReservation(uuid);
                        }}
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
            onClick={() => {
              dispatch(calendarActions.bookListReservation(listReservation));
            }}
          >
            Rezerwuje i placę!
          </Button>
        ) : null}
      </Accordion>
    </div>
  );
};
export default FewReservations;
