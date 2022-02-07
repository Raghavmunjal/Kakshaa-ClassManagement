/** @format */

import {
  CREATE_BATCH_FAIL,
  CREATE_BATCH_SUCCESS,
  CREATE_BATCH_REQUEST,
  DELETE_BATCH_FAIL,
  DELETE_BATCH_SUCCESS,
  DELETE_BATCH_REQUEST,
  GET_ALL_BATCH_FAIL,
  GET_ALL_BATCH_REQUEST,
  GET_ALL_BATCH_SUCCESS,
  UPDATE_BATCH_REQUEST,
  UPDATE_BATCH_SUCCESS,
  UPDATE_BATCH_FAIL,
} from "../constants/batchConstants";

export const createBatchReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_BATCH_REQUEST:
      return { loading: true };
    case CREATE_BATCH_SUCCESS:
      return { loading: false, batch: action.payload };
    case CREATE_BATCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllBatchReducer = (state = { batches: [] }, action) => {
  switch (action.type) {
    case GET_ALL_BATCH_REQUEST:
      return { loading: true };
    case GET_ALL_BATCH_SUCCESS:
      return { loading: false, batches: action.payload };
    case GET_ALL_BATCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteBatchReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_BATCH_REQUEST:
      return { loading: true };
    case DELETE_BATCH_SUCCESS:
      return { loading: false, deleteSuccess: true };
    case DELETE_BATCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateBatchReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_BATCH_REQUEST:
      return { loading: true };
    case UPDATE_BATCH_SUCCESS:
      return { loading: false };
    case UPDATE_BATCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
