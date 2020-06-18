import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import {Tooltip} from '@material-ui/core'
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories,state) {
  return { name, calories,state};
}

const rows = [
  createData('15:00', 'A','wolne'),
  createData('16:30', 'B','zajete'),
  createData('18:00','C','zajete'),
  createData('19:30','D','zajete'),
  createData('21:00','A','wolne'),
];

const Hours = () => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="caption table">
      <TableHead>
        <TableRow>
          <TableCell align="justify">Godzina</TableCell>
          <TableCell align="justify">Strefa</TableCell>
          <TableCell align="justify">Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow hover={true} key={row._id}>
             <TableCell
              align="justify"
            >
              {row.name}
            </TableCell>
            <TableCell
              align="justify"
            >
              {row.calories}
            </TableCell>
            <TableCell
              align="justify"
            >
              {row.state}
            </TableCell>
            <TableCell>
              <Tooltip title="Zarezerwuj">
                <DeleteIcon onClick ={(event) =>{console.log('1')}}/>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
}
export default Hours;