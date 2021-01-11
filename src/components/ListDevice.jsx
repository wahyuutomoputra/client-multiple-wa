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
import { withStyles, makeStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ListDevice = ({ empty, rows, detailAction }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} style={{ marginTop: 25 }}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>Nama Server</StyledTableCell>
            <StyledTableCell>Deskripsi</StyledTableCell>
            <StyledTableCell>Detail</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!empty &&
            rows.map((val, idx) => (
              <TableRow key={idx}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{val.name}</TableCell>
                <TableCell>{val.description}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => detailAction(val.id)}
                  >
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListDevice;
