/** @format */

import axios from "axios";
import { displayInstructor, displayStudent } from "./adminAction";
import { toast } from "react-toastify";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_VERIFY_EMAIL_FAIL,
  USER_VERIFY_EMAIL_REQUEST,
  USER_VERIFY_EMAIL_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  USER_DELETE_FAIL,
  USER_DELETE_SUCCESS,
  USER_DELETE_REQUEST,
} from "../constants/userConstants";
import Resizer from "react-image-file-resizer";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const login = (email, password, history) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axios.post(
      "/api/user/login",
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    /* set data in localstorage without token */
    const setData = {
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
      phone: data.phone,
    };

    window.localStorage.setItem("userInfo", JSON.stringify(setData));

    /* redirecting */
    if (data.role === "Admin") {
      history.push("/admin/dashboard");
    } else if (data.role === "Student") {
      history.push("/student/dashboard");
    } else if (data.role === "Instructor") {
      history.push("/instructor/dashboard");
    }
  } catch (error) {
    toast.error(error.response.data);
    dispatch({ type: USER_LOGIN_FAIL, payload: error.response.data });
  }
};

export const verifyEmail = (email) => async (dispatch) => {
  try {
    dispatch({ type: USER_VERIFY_EMAIL_REQUEST });
    const { data } = await axios.post(
      "/api/user/verify-email",
      { email },
      config
    );
    dispatch({ type: USER_VERIFY_EMAIL_SUCCESS, payload: data });
  } catch (error) {
    toast.error(error.response.data);
    dispatch({ type: USER_VERIFY_EMAIL_FAIL, payload: error.response.data });
  }
};

export const forgotPassword =
  (email, password, otp, hashCode) => async (dispatch) => {
    try {
      dispatch({ type: USER_FORGOT_PASSWORD_REQUEST });
      const { data } = await axios.post(
        "/api/user/forgot-password",
        { email, password, otp, hashCode },
        config
      );
      dispatch({ type: USER_FORGOT_PASSWORD_SUCCESS, payload: data });
    } catch (error) {
      toast.error(error.response.data);
      dispatch({
        type: USER_FORGOT_PASSWORD_FAIL,
        payload: error.response.data,
      });
    }
  };

export const logout = (history) => async (dispatch) => {
  try {
    await axios.post("/api/user/logout", {}, config);
    window.localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    history.push("/");
  } catch (error) {
    console.log(error);
    toast.error(error.response.data);
  }
};

export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.post(`/api/user/${id}`, {}, config);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data });
    console.log(error);
    toast.error(error.response.data);
  }
};

export const updateUserProfile =
  (name, phone) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_PROFILE_REQUEST,
      });

      const { data } = await axios.put(
        `/api/user/update-profile`,
        { name, phone },
        config
      );

      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
      toast.success("Update Successfully");
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const upload = (file) => async (dispatch) => {
  if (file) {
    Resizer.imageFileResizer(
      file,
      720,
      720,
      "JPEG",
      100,
      0,
      (uri) => {
        dispatch({ type: UPLOAD_IMAGE_REQUEST });
        axios
          .post(`/api/user/upload-image`, { image: uri }, config)
          .then((res) => {
            dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: res.data });
          })
          .catch((error) => {
            console.log(error);
            dispatch({
              type: UPLOAD_IMAGE_FAIL,
              payload: error.response.data,
            });
            toast.error("Image Upload Fail,Try Again");
          });
      },
      "base64"
    );
  }
};

export const deleteUser = (id, role) => async (dispatch) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    await axios.delete(`/api/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch({ type: USER_DELETE_SUCCESS });
    toast.success("Deleted ✔");

    if (role === "student") {
      dispatch(displayStudent());
    } else {
      dispatch(displayInstructor());
    }
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.response.data,
    });
    toast.error("Error While Deleting USER ,Try Again");
  }
};
