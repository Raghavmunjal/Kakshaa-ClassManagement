/** @format */
import {
  COURSE_ADD_ANNOUNCEMENT_FAIL,
  COURSE_ADD_ANNOUNCEMENT_REQUEST,
  COURSE_ADD_ANNOUNCEMENT_SUCCESS,
  COURSE_ADD_LESSON_FAIL,
  COURSE_ADD_LESSON_REQUEST,
  COURSE_ADD_LESSON_SUCCESS,
  COURSE_CREATE_FAIL,
  COURSE_CREATE_REQUEST,
  COURSE_CREATE_RESET,
  COURSE_CREATE_SUCCESS,
  COURSE_GET_ALL_FAIL,
  COURSE_GET_ALL_REQUEST,
  COURSE_GET_ALL_SUCCESS,
  COURSE_GET_DETAILS_FAIL,
  COURSE_GET_DETAILS_REQUEST,
  COURSE_GET_DETAILS_SUCCESS,
  COURSE_DELETE_ANNOUNCEMENT_REQUEST,
  COURSE_DELETE_ANNOUNCEMENT_SUCCESS,
  COURSE_DELETE_ANNOUNCEMENT_FAIL,
  COURSE_DELETE_LESSON_REQUEST,
  COURSE_DELETE_LESSON_SUCCESS,
  COURSE_DELETE_LESSON_FAIL,
  COURSE_DELETE_LESSON_RESET,
  COURSE_DELETE_REQUEST,
  COURSE_DELETE_SUCCESS,
  COURSE_DELETE_FAIL,
} from "../constants/courseConstants";

export const courseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_CREATE_REQUEST:
      return { loading: true };
    case COURSE_CREATE_SUCCESS:
      return { loading: false, course: action.payload, success: true };
    case COURSE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case COURSE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const courseGetAllReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case COURSE_GET_ALL_REQUEST:
      return { loading: true };
    case COURSE_GET_ALL_SUCCESS:
      return {
        loading: false,
        courses: action.payload.courses,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case COURSE_GET_ALL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const courseGetDetailsReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case COURSE_GET_DETAILS_REQUEST:
      return { loading: true };
    case COURSE_GET_DETAILS_SUCCESS:
      return { loading: false, course: action.payload };
    case COURSE_GET_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const courseAddLessonReducer = (state = { lesson: {} }, action) => {
  switch (action.type) {
    case COURSE_ADD_LESSON_REQUEST:
      return { loading: true };
    case COURSE_ADD_LESSON_SUCCESS:
      return { loading: false, lesson: action.payload, success: true };
    case COURSE_ADD_LESSON_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const courseAddAnnouncementReducer = (
  state = { announcement: {} },
  action
) => {
  switch (action.type) {
    case COURSE_ADD_ANNOUNCEMENT_REQUEST:
      return { loading: true };
    case COURSE_ADD_ANNOUNCEMENT_SUCCESS:
      return { loading: false, announcement: action.payload, success: true };
    case COURSE_ADD_ANNOUNCEMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const courseDeleteAnnouncementReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_DELETE_ANNOUNCEMENT_REQUEST:
      return { loading: true };
    case COURSE_DELETE_ANNOUNCEMENT_SUCCESS:
      return { loading: false };
    case COURSE_DELETE_ANNOUNCEMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const courseDeleteLessonReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_DELETE_LESSON_REQUEST:
      return { loading: true };
    case COURSE_DELETE_LESSON_SUCCESS:
      return { loading: false };
    case COURSE_DELETE_LESSON_FAIL:
      return { loading: false, error: action.payload };
    case COURSE_DELETE_LESSON_RESET:
      return {};
    default:
      return state;
  }
};

export const courseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_DELETE_REQUEST:
      return { loading: true };
    case COURSE_DELETE_SUCCESS:
      return { loading: false };
    case COURSE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
