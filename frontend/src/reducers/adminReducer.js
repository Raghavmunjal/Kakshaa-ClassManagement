/** @format */

import {
  INSTRUCTOR_REGISTER_REQUEST,
  INSTRUCTOR_REGISTER_SUCCESS,
  INSTRUCTOR_REGISTER_FAIL,
  STUDENT_REGISTER_REQUEST,
  STUDENT_REGISTER_SUCCESS,
  STUDENT_REGISTER_FAIL,
  INSTRUCTOR_DISPLAY_FAIL,
  INSTRUCTOR_DISPLAY_REQUEST,
  INSTRUCTOR_DISPLAY_SUCCESS,
  STUDENT_DISPLAY_FAIL,
  STUDENT_DISPLAY_REQUEST,
  STUDENT_DISPLAY_SUCCESS,
} from "../constants/adminConstants";

export const instructorRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case INSTRUCTOR_REGISTER_REQUEST:
      return { loading: true };
    case INSTRUCTOR_REGISTER_SUCCESS:
      return { loading: false, instructor: action.payload };
    case INSTRUCTOR_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const studentRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_REGISTER_REQUEST:
      return { loading: true };
    case STUDENT_REGISTER_SUCCESS:
      return { loading: false, student: action.payload };
    case STUDENT_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const instructorDisplayReducer = (
  state = { instructors: [] },
  action
) => {
  switch (action.type) {
    case INSTRUCTOR_DISPLAY_REQUEST:
      return { loading: true };
    case INSTRUCTOR_DISPLAY_SUCCESS:
      return { loading: false, instructors: action.payload };
    case INSTRUCTOR_DISPLAY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const studentDisplayReducer = (state = { students: [] }, action) => {
  switch (action.type) {
    case STUDENT_DISPLAY_REQUEST:
      return { loading: true };
    case STUDENT_DISPLAY_SUCCESS:
      return { loading: false, students: action.payload };
    case STUDENT_DISPLAY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
