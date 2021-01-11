import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button
} from "@material-ui/core";
import { api } from "../api";

const AddDevice = ({ getData }) => {
  const [name, setName] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

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
  return (
    <div>
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
    </div>
  );
};

export default AddDevice;
