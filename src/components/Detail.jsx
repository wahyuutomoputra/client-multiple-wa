import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { Typography, Card, CardActions, CardContent } from "@material-ui/core";
import io from "socket.io-client";
import { URL, WS } from "../api";
import ReactLoading from "react-loading";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  root: {
    minWidth: 275,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Detail({ open = false, id, close }) {
  const classes = useStyles();
  const handleClose = () => close(false);
  const [qrImage, setQrImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const socket = io(URL);
    socket.on("connect", (data) => {
      socket.on("welcome", (message) => {
        console.log(message);
      });

      socket.emit("cek-status", { id: id });

      socket.on(`qrcode-${id}`, (message) => {
        setLoading(false);
        setQrImage(message.image);
        console.log(message);
      });

      socket.on(`ready-${id}`, (message) => {
        setLoading(false);
        setReady(true);
        console.log(message);
      });
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Detail server
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          {loading && (
            <ReactLoading type="spin" color="blue" height={250} width={250} />
          )}
          {qrImage != "" && (
            <img
              src={qrImage != "" ? qrImage : null}
              width={250}
              height={250}
            />
          )}
          <Card className={classes.root}>
            <CardContent>
              {ready && (
                <div>
                  <Typography variant="body2" component="p">
                    phone has connected, your server ready to use
                  </Typography>
                </div>
              )}
              <Typography variant="body2" component="p">
                Api-Key = {id}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Dialog>
    </div>
  );
}
