import React, { useState } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CreateIcon from "@material-ui/icons/Create";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import StarsIcon from "@material-ui/icons/Stars";

import { Container, Grid } from "@material-ui/core";
import UserHome from "./UserHome";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const UserInfo = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const userId = user?.result._id || user?.result.googleId;

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Container maxWidth="xl">
      <Grid container justify="space-around" spacing={3}>
        <Grid item md={3} lg={3}>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                User Profile Page
              </ListSubheader>
            }
            className={classes.root}
          >
            <ListItem button component={Link} to={`/user/${userId}`}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="User Information" />
            </ListItem>
            <ListItem button component={Link} to={`/user/posts/${userId}`}>
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText primary="Created Events" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to={`/user/postsFollowed/${userId}`}
            >
              <ListItemIcon>
                <StarsIcon />
              </ListItemIcon>
              <ListItemText primary="Followed Events" />
            </ListItem>
          </List>
        </Grid>
        <Grid item md={9} lg={9}>
          <UserHome />
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserInfo;
