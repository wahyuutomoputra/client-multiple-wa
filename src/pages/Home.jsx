import React, { useEffect, useState } from "react";
import { Content, Detail, ListDevice, AddDevice, Loading } from "../components";
import io from "socket.io-client";
import { api, URL, WS } from "../api";

const Home = () => {
  const socket = io(URL);
  const [rows, setRows] = useState([]);
  const [empty, setEmpty] = useState(true);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

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
      <AddDevice getData={getData} />
      <ListDevice empty={empty} rows={rows} detailAction={showStatus} />
      {open && <Detail open={open} close={setOpen} id={id} />}
      <Loading loading={loading} empty={empty} />
    </Content>
  );
};

export default Home;
