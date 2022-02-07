/** @format */

import {
  CREATE_INSTITUTE_FAIL,
  CREATE_INSTITUTE_SUCCESS,
  CREATE_INSTITUTE_REQUEST,
  DELETE_INSTITUTE_FAIL,
  DELETE_INSTITUTE_SUCCESS,
  DELETE_INSTITUTE_REQUEST,
  GET_ALL_INSTITUTE_FAIL,
  GET_ALL_INSTITUTE_REQUEST,
  GET_ALL_INSTITUTE_SUCCESS,
  UPDATE_INSTITUTE_FAIL,
  UPDATE_INSTITUTE_REQUEST,
  UPDATE_INSTITUTE_SUCCESS
} from "../constants/instituteConstants";

export const createInstituteReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_INSTITUTE_REQUEST:
      return { loading: true };
    case CREATE_INSTITUTE_SUCCESS:
      return { loading: false, institute: action.payload };
    case CREATE_INSTITUTE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllInstituteReducer = (state = { institutes: [] }, action) => {
  switch (action.type) {
    case GET_ALL_INSTITUTE_REQUEST:
      return { loading: true };
    case GET_ALL_INSTITUTE_SUCCESS:
      return { loading: false, institutes: action.payload };
    case GET_ALL_INSTITUTE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteInstituteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_INSTITUTE_REQUEST:
      return { loading: true };
    case DELETE_INSTITUTE_SUCCESS:
      return { loading: false, deleteSuccess: true };
    case DELETE_INSTITUTE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateInstituteReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_INSTITUTE_REQUEST:
      return { loading: true };
    case UPDATE_INSTITUTE_SUCCESS:
      return { loading: false };
    case UPDATE_INSTITUTE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
