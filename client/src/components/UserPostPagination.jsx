import React, { useEffect } from "react";
import PaginationItem from "@material-ui/lab/PaginationItem";
// import alpha from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { useDispatch, useSelector } from "react-redux";

import { getUserPost } from "../actions/auth";

import { Link } from "react-router-dom";

import useStyles from "./styles";

const UserPostPagination = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) dispatch(getUserPost(page));
  }, [page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/user/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default UserPostPagination;
