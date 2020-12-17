import React, { useEffect, useState } from "react";
import { Content, Detail } from "../components";
import {
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import io from "socket.io-client";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { api, URL } from "../api";
import ReactLoading from "react-loading";

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

const Home = () => {
  const socket = io(URL);
  const [name, setName] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [empty, setEmpty] = useState(true);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  const createUser = async () => {
    if (name == "" || deskripsi == "") {
      alert("Lengkapi nama dan deskripsi server");
    } else {
      await api
        .post("/api/createServer", {
          name,
          description: deskripsi,
        })
        .then((x) => {
          console.log(x.data);
          getData();
          setName("");
          setDeskripsi("");
        })
        .catch((err) => console.log(err));
    }
  };

  const getData = async () => {
    setLoading(true);
    await api
      .get("/api/getAllClient")
      .then((x) => {
        const haveRows = (x?.data?.data).length <= 0 ? true : false;
        setEmpty(haveRows);
        setRows(x.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const showStatus = (id) => {
    setOpen(true);
    setId(id);
  };

  useEffect(() => {
    getData();
    socket.on("connect", (data) => {
      socket.on("welcome", (message) => {
        console.log(message);
      });
    });
  }, [empty]);

  return (
    <Content>
      <form style={{ marginBottom: 15 }}>
        <div>
          <FormControl>
            <InputLabel htmlFor="component-simple">
              Masukkan nama server
            </InputLabel>
            <Input
              id="component-simple"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
        </div>

        <div>
          <FormControl>
            <InputLabel htmlFor="component-simple">Deskripsi server</InputLabel>
            <Input
              rowsMin={3}
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
            />
          </FormControl>
        </div>
      </form>
      <Button onClick={createUser} variant="contained" color="primary">
        Create Server
      </Button>

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
                      onClick={() => showStatus(val.id)}
                    >
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {open && <Detail open={open} close={setOpen} id={id} />}
      {loading && (
        <ReactLoading type="spin" color="blue" height={100} width={100} />
      )}
      {empty && <Typography>No client found</Typography>}
    </Content>
  );
};

export default Home;
