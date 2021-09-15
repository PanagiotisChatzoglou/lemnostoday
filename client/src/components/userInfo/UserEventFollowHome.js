import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CreateIcon from "@material-ui/icons/Create";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import StarsIcon from "@material-ui/icons/Stars";
import { useDispatch } from "react-redux";

import { Container, Grid, Paper } from "@material-ui/core";
import UserEventFollow from "./UserEventFollow";
import { getUserPost } from "../../actions/auth";

import UserPostPagination from "../UserPostPagination";

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

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

const UserEventFollowHome = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  // const query = useQuery();
  // const page = query.get("page") || 1;

  const userId = user?.result._id || user?.result.googleId;

  useEffect(() => {
    dispatch(getUserPost());
  }, [dispatch]);

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
            <ListItem
              button
              gutterBottom
              component={Link}
              to={`/user/${userId}`}
            >
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
          {/* <Paper elevation={6} className={classes.pagination}>
            <UserPostPagination page={page} />
          </Paper> */}
        </Grid>
        <Grid item md={9} lg={9}>
          <UserEventFollow />
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserEventFollowHome;
