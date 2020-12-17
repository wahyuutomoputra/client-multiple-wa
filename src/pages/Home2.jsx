import React, { useEffect, useState } from "react";
import { Content } from "../components";
import Typography from "@material-ui/core/Typography";
import io from "socket.io-client";

const Home = () => {
  const [qrImage, setQrImage] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:8080");
    socket.on("connect", (data) => {
      socket.on("welcome", (message) => {
        console.log(message);
      });

      socket.on("qrcode", (message) => {
        setQrImage(message.data);
        console.log(message);
      });
    });
  }, []);

  return (
    <Content>
      <img src={qrImage != "" ? qrImage : null} width={500} height={500} />
      <Typography paragraph>
        Lorem ipsum dolor sit amet
      </Typography>
    </Content>
  );
};

export default Home;
