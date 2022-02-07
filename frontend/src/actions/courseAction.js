/** @format */

import {
  COURSE_ADD_LESSON_FAIL,
  COURSE_ADD_LESSON_REQUEST,
  COURSE_ADD_LESSON_SUCCESS,
  COURSE_CREATE_FAIL,
  COURSE_CREATE_REQUEST,
  COURSE_CREATE_SUCCESS,
  COURSE_GET_ALL_FAIL,
  COURSE_GET_ALL_REQUEST,
  COURSE_GET_ALL_SUCCESS,
  COURSE_GET_DETAILS_FAIL,
  COURSE_GET_DETAILS_REQUEST,
  COURSE_ADD_ANNOUNCEMENT_REQUEST,
  COURSE_ADD_ANNOUNCEMENT_FAIL,
  COURSE_ADD_ANNOUNCEMENT_SUCCESS,
  COURSE_GET_DETAILS_SUCCESS,
  COURSE_DELETE_ANNOUNCEMENT_FAIL,
  COURSE_DELETE_ANNOUNCEMENT_SUCCESS,
  COURSE_DELETE_ANNOUNCEMENT_REQUEST,
  COURSE_DELETE_LESSON_FAIL,
  COURSE_DELETE_LESSON_SUCCESS,
  COURSE_DELETE_LESSON_REQUEST,
  COURSE_DELETE_FAIL,
  COURSE_DELETE_REQUEST,
  COURSE_DELETE_SUCCESS,
} from "../constants/courseConstants";
import { toast } from "react-toastify";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const courseCreate = (values) => async (dispatch) => {
  try {
    const { title, description, image, institute, branch, section, year } =
      values;

    dispatch({ type: COURSE_CREATE_REQUEST });

    const { data } = await axios.post(
      "/api/instructor/course/create",
      { title, description, image, institute, branch, section, year },
      config
    );

    dispatch({ type: COURSE_CREATE_SUCCESS, payload: data });
    toast.success("Created Successfully");
  } catch (error) {
    dispatch({
      type: COURSE_CREATE_FAIL,
      payload: error.response.data,
    });
    toast.error("Error While Creating,Try Again");
  }
};

export const getCourses = (value, page) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_GET_ALL_REQUEST });

    const { data } = await axios.post(
      `/api/${value}/course/get/all`,
      { page },
      config
    );

    dispatch({ type: COURSE_GET_ALL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COURSE_GET_ALL_FAIL,
      payload: error.response,
    });
    toast.error("Error While Getting Courses ,Try Again");
  }
};

export const getCourseDetails = (slug, value) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_GET_DETAILS_REQUEST });

    const { data } = await axios.post(
      `/api/${value}/course/get`,
      { slug },
      config
    );

    dispatch({ type: COURSE_GET_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COURSE_GET_DETAILS_FAIL,
      payload: error.response.data,
    });
    toast.error("Error While Getting Courses ,Try Again");
  }
};

export const addLesson = (slug, values) => async (dispatch) => {
  try {
    const { title, description, video } = values;

    dispatch({ type: COURSE_ADD_LESSON_REQUEST });

    const { data } = await axios.post(
      `/api/instructor/course/add-lesson`,
      { title, description, video, slug },
      config
    );

    dispatch({ type: COURSE_ADD_LESSON_SUCCESS, payload: data });
    dispatch(getCourseDetails(slug, "instructor"));
  } catch (error) {
    dispatch({
      type: COURSE_ADD_LESSON_FAIL,
      payload: error.response.data,
    });
    toast.error("Error While Adding Lesson ,Try Again");
  }
};

export const addAnnouncement =
  (slug, announcementValues) => async (dispatch) => {
    try {
      const { description, file } = announcementValues;

      dispatch({ type: COURSE_ADD_ANNOUNCEMENT_REQUEST });

      const { data } = await axios.post(
        `/api/instructor/course/add-announcement`,
        { description, file, slug },
        config
      );

      dispatch({ type: COURSE_ADD_ANNOUNCEMENT_SUCCESS, payload: data });
      dispatch(getCourseDetails(slug, "instructor"));
    } catch (error) {
      dispatch({
        type: COURSE_ADD_ANNOUNCEMENT_FAIL,
        payload: error.response.data,
      });
      toast.error("Error While Adding Announcement ,Try Again");
    }
  };

export const deleteAnnouncement = (courseId, id, slug) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_DELETE_ANNOUNCEMENT_REQUEST });

    await axios.delete(`/api/instructor/course/delete-announcement`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: { courseId: courseId, id: id },
    });
    dispatch({ type: COURSE_DELETE_ANNOUNCEMENT_SUCCESS });
    toast.success("Deleted ✔");
    dispatch(getCourseDetails(slug, "instructor"));
  } catch (error) {
    dispatch({
      type: COURSE_DELETE_ANNOUNCEMENT_FAIL,
      payload: error.response.data,
    });
    toast.error("Error While Deleting Announcement ,Try Again");
  }
};

export const deleteLesson = (courseId, id, slug) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_DELETE_LESSON_REQUEST });

    await axios.delete(`/api/instructor/course/delete-lesson`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: { courseId: courseId, id: id },
    });
    dispatch({ type: COURSE_DELETE_LESSON_SUCCESS });
    toast.success("Deleted ✔");
    dispatch(getCourseDetails(slug, "instructor"));
  } catch (error) {
    dispatch({
      type: COURSE_DELETE_LESSON_FAIL,
      payload: error.response.data,
    });
    toast.error("Error While Deleting Lesson ,Try Again");
  }
};

export const deleteCourse = (id, instructor) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_DELETE_REQUEST });

    await axios.delete(`/api/instructor/course/delete`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: { courseId: id, instructor: instructor },
    });
    dispatch({ type: COURSE_DELETE_SUCCESS });
    toast.success("Deleted ✔");
    dispatch(getCourses("instructor"));
  } catch (error) {
    dispatch({
      type: COURSE_DELETE_FAIL,
      payload: error.response.data,
    });
    toast.error("Error While Deleting Course ,Try Again");
  }
};
