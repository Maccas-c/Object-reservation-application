import React from 'react';

import {
  AccordionSummary,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Accordion,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { usePriceListService } from './service';

const PriceList = () => {
  const {
    classes,
    priceList,
    isExpanded,
    clickExpandHandler,
  } = usePriceListService();

  return (
    <Accordion {...{ expanded: isExpanded }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        {...{ onClick: clickExpandHandler }}
      >
        <Typography className={classes.title}>Cennik</Typography>
      </AccordionSummary>
      <TableContainer className={classes.tablet}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Strefa Boiska</TableCell>
              <TableCell align="center">
                Zajęcia rekreacyjno-sportowe,treningi
              </TableCell>
              <TableCell align="center">Mecze,turnieje</TableCell>
              <TableCell align="center">Uczelniany Klub AZS UAM</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {priceList
              ? priceList.map(
                  ({
                    classes_and_sports_training,
                    id,
                    name,
                    tournament_matches,
                    university_club,
                  }) => {
                    return (
                      <TableRow hover={true} key={id}>
                        <TableCell align="center">{name}</TableCell>
                        <TableCell align="center">
                          {classes_and_sports_training}
                        </TableCell>
                        <TableCell align="center">
                          {tournament_matches}
                        </TableCell>
                        <TableCell align="center">{university_club}</TableCell>
                      </TableRow>
                    );
                  },
                )
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Accordion>
  );
};

export default PriceList;
