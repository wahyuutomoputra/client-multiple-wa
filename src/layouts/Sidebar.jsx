import React from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Routes from "../routes";
import { NavLink, withRouter } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import useStyles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import { open, close } from '../store/sidebar';
import { setTitle } from '../store/appbar';

const Sidebar = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { status } = useSelector(state => state.sidebar);

  const list = () => (
    <div>
      <List>
        {Routes.map((prop, key) => {
          return (
            <NavLink
              style={{ textDecoration: "none", color: "grey" }}
              to={prop.path}
              key={key}
              onClick={() => dispatch(setTitle(prop.sidebarName))}
            >
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={prop.sidebarName} />
              </ListItem>
            </NavLink>
          );
        })}
      </List>
      <Divider />
    </div>
  );

  return (
    <React.Fragment>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: status,
          [classes.drawerClose]: !status,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: status,
            [classes.drawerClose]: !status,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={() => dispatch(close())}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        {list()}
      </Drawer>
    </React.Fragment>
  );
};

export default Sidebar;
