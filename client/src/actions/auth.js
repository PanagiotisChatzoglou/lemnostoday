import {
  AUTH,
  START_LOADING,
  END_LOADING,
  FETCH_ALL,
  FETCH_ALL_USER,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const getUserInfo = (id, router) => async (dispatch) => {
  try {
    //
  } catch (err) {
    console.log(err);
  }
};

export const getUserPost = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getUserPosts();
    dispatch({ type: FETCH_ALL_USER, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const getUserPostFollowed = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getUserPosts();
    dispatch({ type: FETCH_ALL_USER, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};
