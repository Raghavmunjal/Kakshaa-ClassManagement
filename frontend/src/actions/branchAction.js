/** @format */

import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_BRANCH_FAIL,
  CREATE_BRANCH_REQUEST,
  CREATE_BRANCH_SUCCESS,
  DELETE_BRANCH_FAIL,
  DELETE_BRANCH_REQUEST,
  DELETE_BRANCH_SUCCESS,
  GET_ALL_BRANCH_FAIL,
  GET_ALL_BRANCH_REQUEST,
  GET_ALL_BRANCH_SUCCESS,
  UPDATE_BRANCH_FAIL,
  UPDATE_BRANCH_REQUEST,
  UPDATE_BRANCH_SUCCESS,
} from "../constants/branchConstants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const createBranch = (name, institute) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_BRANCH_REQUEST });

    const { data } = await axios.post(
      "/api/admin/branch",
      { name, institute },
      config
    );

    dispatch({ type: CREATE_BRANCH_SUCCESS, payload: data });
    toast.success(`${name} created successfully`);
  } catch (error) {
    toast.error(error.response.data);
    dispatch({ type: CREATE_BRANCH_FAIL, payload: error.response.data });
  }
};

export const updateBranch = (id, name, institute) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BRANCH_REQUEST });

    await axios.put("/api/admin/branch", { name, institute, id }, config);

    dispatch({ type: UPDATE_BRANCH_SUCCESS });
    toast.success(`Updated ✔`);
    dispatch(getAllBranch());
  } catch (error) {
    toast.error(error.response.data);
    dispatch({ type: UPDATE_BRANCH_FAIL, payload: error.response.data });
  }
};

export const getAllBranch = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_BRANCH_REQUEST });

    const { data } = await axios.post("/api/admin/branch/all", {}, config);

    dispatch({ type: GET_ALL_BRANCH_SUCCESS, payload: data });
  } catch (error) {
    toast.error(error.response.data);
    dispatch({ type: GET_ALL_BRANCH_FAIL, payload: error.response.data });
  }
};

export const deleteBranch = (slug) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BRANCH_REQUEST });

    await axios.delete(`/api/admin/branch/${slug}`, config);

    dispatch({ type: DELETE_BRANCH_SUCCESS });
    toast.success("Deleted Successfully");
  } catch (error) {
    toast.error(error.response.data);
    dispatch({ type: DELETE_BRANCH_FAIL, payload: error.response.data });
  }
};
