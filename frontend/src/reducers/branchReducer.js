/** @format */

import {
  CREATE_BRANCH_FAIL,
  CREATE_BRANCH_SUCCESS,
  CREATE_BRANCH_REQUEST,
  DELETE_BRANCH_FAIL,
  DELETE_BRANCH_SUCCESS,
  DELETE_BRANCH_REQUEST,
  GET_ALL_BRANCH_FAIL,
  GET_ALL_BRANCH_REQUEST,
  GET_ALL_BRANCH_SUCCESS,
  UPDATE_BRANCH_FAIL,
  UPDATE_BRANCH_REQUEST,
  UPDATE_BRANCH_SUCCESS,
} from "../constants/branchConstants";

export const createBranchReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_BRANCH_REQUEST:
      return { loading: true };
    case CREATE_BRANCH_SUCCESS:
      return { loading: false, branch: action.payload };
    case CREATE_BRANCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllBranchReducer = (state = { branches: [] }, action) => {
  switch (action.type) {
    case GET_ALL_BRANCH_REQUEST:
      return { loading: true };
    case GET_ALL_BRANCH_SUCCESS:
      return { loading: false, branches: action.payload };
    case GET_ALL_BRANCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteBranchReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_BRANCH_REQUEST:
      return { loading: true };
    case DELETE_BRANCH_SUCCESS:
      return { loading: false, deleteSuccess: true };
    case DELETE_BRANCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateBranchReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_BRANCH_REQUEST:
      return { loading: true };
    case UPDATE_BRANCH_SUCCESS:
      return { loading: false };
    case UPDATE_BRANCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
