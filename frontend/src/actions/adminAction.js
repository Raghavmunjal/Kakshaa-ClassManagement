/** @format */

import {
  INSTRUCTOR_REGISTER_REQUEST,
  INSTRUCTOR_REGISTER_SUCCESS,
  INSTRUCTOR_REGISTER_FAIL,
  STUDENT_REGISTER_FAIL,
  STUDENT_REGISTER_REQUEST,
  STUDENT_REGISTER_SUCCESS,
  INSTRUCTOR_DISPLAY_FAIL,
  INSTRUCTOR_DISPLAY_REQUEST,
  INSTRUCTOR_DISPLAY_SUCCESS,
  STUDENT_DISPLAY_FAIL,
  STUDENT_DISPLAY_REQUEST,
  STUDENT_DISPLAY_SUCCESS,
} from "../constants/adminConstants";
import axios from "axios";
import { toast } from "react-toastify";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const registerInstructor = (values, image) => async (dispatch) => {
  try {
    const { email, name, phone } = values;
    dispatch({ type: INSTRUCTOR_REGISTER_REQUEST });
    let { data } = await axios.post(
      `/api/admin/instructor/register`,
      { name, image, phone, email },
      config
    );
    dispatch({ type: INSTRUCTOR_REGISTER_SUCCESS, payload: data });
    toast.success("Register Successfully");
  } catch (error) {
    console.log(error);
    dispatch({
      type: INSTRUCTOR_REGISTER_FAIL,
      payload: error.response.data,
    });
    toast.error("Error While Creating,Try Again");
  }
};

export const registerStudent = (values) => async (dispatch) => {
  try {
    const { email, name, phone, image, institute, branch, section, year } =
      values;
    dispatch({ type: STUDENT_REGISTER_REQUEST });
    let { data } = await axios.post(
      `/api/admin/student/register`,
      { name, image, phone, email, institute, branch, section, year },
      config
    );
    dispatch({ type: STUDENT_REGISTER_SUCCESS, payload: data });
    toast.success("Register Successfully");
  } catch (error) {
    console.log(error);
    dispatch({
      type: STUDENT_REGISTER_FAIL,
      payload: error.response.data,
    });
    toast.error("Error While Creating,Try Again");
  }
};

export const displayStudent = () => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_DISPLAY_REQUEST });
    let { data } = await axios.post(`/api/admin/student/display`, {}, config);
    dispatch({ type: STUDENT_DISPLAY_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: STUDENT_DISPLAY_FAIL,
      payload: error.response.data,
    });
    toast.error("Error !");
  }
};

export const displayInstructor = () => async (dispatch) => {
  try {
    dispatch({ type: INSTRUCTOR_DISPLAY_REQUEST });
    let { data } = await axios.post(
      `/api/admin/instructor/display`,
      {},
      config
    );
    dispatch({ type: INSTRUCTOR_DISPLAY_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: INSTRUCTOR_DISPLAY_FAIL,
      payload: error.response.data,
    });
    toast.error("Error !");
  }
};
