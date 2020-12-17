import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { open } from "../store/sidebar";

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.sidebar);
  const { title } = useSelector((state) => state.appbar);

  return (
    <AppBar
      className={clsx(classes.appBar, {
        [classes.appBarShift]: status,
      })}
    >
      <Toolbar>
        <IconButton
          edge="start"
          className={clsx(classes.menuButton, status && classes.hide)}
          color="inherit"
          aria-label="menu"
          onClick={() => dispatch(open())}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          { title }
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
