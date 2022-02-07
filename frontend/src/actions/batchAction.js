/** @format */

import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_BATCH_FAIL,
  CREATE_BATCH_REQUEST,
  CREATE_BATCH_SUCCESS,
  DELETE_BATCH_FAIL,
  DELETE_BATCH_REQUEST,
  DELETE_BATCH_SUCCESS,
  GET_ALL_BATCH_FAIL,
  GET_ALL_BATCH_REQUEST,
  GET_ALL_BATCH_SUCCESS,
  UPDATE_BATCH_FAIL,
  UPDATE_BATCH_REQUEST,
  UPDATE_BATCH_SUCCESS,
} from "../constants/batchConstants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const createBatch =
  (institute, branch, year, section) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_BATCH_REQUEST });

      const { data } = await axios.post(
        "/api/admin/batch",
        { institute, branch, section, year },
        config
      );

      dispatch({ type: CREATE_BATCH_SUCCESS, payload: data });
      toast.success(`Batch created successfully`);
    } catch (error) {
      toast.error(error.response.data);
      dispatch({ type: CREATE_BATCH_FAIL, payload: error.response.data });
    }
  };

export const getAllBatch = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_BATCH_REQUEST });

    const { data } = await axios.post("/api/admin/batch/all", {}, config);

    dispatch({ type: GET_ALL_BATCH_SUCCESS, payload: data });
  } catch (error) {
    toast.error(error.response);
    dispatch({ type: GET_ALL_BATCH_FAIL, payload: error.response });
  }
};

export const deleteBatch = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BATCH_REQUEST });

    await axios.delete(`/api/admin/batch/${id}`, config);

    dispatch({ type: DELETE_BATCH_SUCCESS });
    toast.success("Deleted Successfully");
  } catch (error) {
    toast.error(error.response.data);
    dispatch({ type: DELETE_BATCH_FAIL, payload: error.response.data });
  }
};

export const updateBatch =
  (institute, branch, section, year, id) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_BATCH_REQUEST });

      await axios.put(
        "/api/admin/batch",
        { id, institute, branch, section, year },
        config
      );

      dispatch({ type: UPDATE_BATCH_SUCCESS });
      toast.success(`Updated ✔`);
      dispatch(getAllBatch());
    } catch (error) {
      toast.error(error.response.data);
      dispatch({ type: UPDATE_BATCH_FAIL, payload: error.response.data });
    }
  };
