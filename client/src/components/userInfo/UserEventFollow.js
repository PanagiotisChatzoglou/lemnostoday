import React, { useState } from "react";
import { Grid, CircularProgress } from "@material-ui/core";

import { useSelector } from "react-redux";
import Post from "../Posts/Post/Post";

const UserEvent = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [likess, setLikes] = useState(posts?.likes);
  const postName = user?.result.googleId || user?.result._id;

  // console.log(posts.filter((post) => post?.likes.find(postName)));
  // const hasLikedPosts = posts.likes.find((like) => like === postName);
  // const hasLiked = posts.likes.find((like) => like === postName);
  // console.log(
  //   posts.map((post) => post.likes).filter((post) => post.includes(postName))
  // );
  // console.log(posts.filter((post) => post?.likes.includes(postName)));
  // if (!posts.length && !isLoading) return "No Posts";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid container alignItems="stretch" spacing={3}>
      {posts
        .filter((post) => post?.likes.includes(postName))
        .map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
            <Post post={post} />
          </Grid>
        ))}
    </Grid>
  );
};

export default UserEvent;
