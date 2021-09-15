import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";
import GradeIcon from "@material-ui/icons/Grade";
import GradeOutlined from "@material-ui/icons/GradeOutlined";

import CommentSection from "./CommentSection";
import { getPost, getPostsBySearch, likePost } from "../../actions/posts";
import useStyles from "./styles";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  const [likes, setLikes] = useState(post?.likes);
  const user = JSON.parse(localStorage.getItem("profile"));

  const userId = user?.result?.googleId || user?.result?._id;
  const hasLikedPost = post?.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  // const FollowButton = () => {
  //   if (likes.length > 0) {
  //     return likes.find((like) => like === userId) ? (
  //       <>
  //         <GradeIcon fontSize="small" />
  //         &nbsp;
  //         {likes.length > 2
  //           ? `You and ${likes.length - 1} others`
  //           : `${likes.length} Follow${likes.length > 1 ? "s" : ""}`}
  //       </>
  //     ) : (
  //       <>
  //         <GradeOutlined fontSize="small" />
  //         &nbsp;{likes.length} {likes.length === 1 ? "Follow" : "Follows"}
  //       </>
  //     );
  //   }

  //   return (
  //     <>
  //       <GradeOutlined fontSize="small" />
  //       &nbsp;Follow
  //     </>
  //   );
  // };

  const FollowButton = () => {
    return hasLikedPost ? (
      <>
        <Typography variant="body1">
          <Button
            variant="contained"
            color="danger"
            size="large"
            type="submit"
            fullWidth
            onClick={handleLike}
          >
            Unfollow Event
          </Button>
        </Typography>
      </>
    ) : (
      <Typography variant="body1">
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          onClick={handleLike}
        >
          Follow Event
        </Button>
      </Typography>
    );

    return (
      <>
        <Typography variant="body1">
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Follow Event
          </Button>
        </Typography>
      </>
    );
  };

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  const openPost = (_id) => history.push(`/posts/${_id}`);

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />

          <FollowButton />

          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
      {recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also enjoy:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(
              ({ title, message, name, likes, selectedFile, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openPost(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes.length}
                  </Typography>
                  <img src={selectedFile} width="200px" />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
