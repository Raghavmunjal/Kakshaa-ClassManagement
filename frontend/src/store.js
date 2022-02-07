/** @format */

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userVerifyEmailReducer,
  userForgotPasswordReducer,
  userDetailsReducer,
  userUpdateReducer,
  userDeleteReducer,
  uploadImageReducer,
} from "./reducers/userReducer";
import {
  createInstituteReducer,
  getAllInstituteReducer,
  deleteInstituteReducer,
  updateInstituteReducer,
} from "./reducers/instituteReducer";
import {
  createBranchReducer,
  deleteBranchReducer,
  updateBranchReducer,
  getAllBranchReducer,
} from "./reducers/branchReducer";
import {
  createBatchReducer,
  deleteBatchReducer,
  getAllBatchReducer,
  updateBatchReducer,
} from "./reducers/batchReducer";
import {
  instructorRegisterReducer,
  studentRegisterReducer,
  instructorDisplayReducer,
  studentDisplayReducer,
} from "./reducers/adminReducer";
import {
  courseCreateReducer,
  courseGetAllReducer,
  courseAddLessonReducer,
  courseGetDetailsReducer,
  courseAddAnnouncementReducer,
  courseDeleteAnnouncementReducer,
  courseDeleteLessonReducer,
  courseDeleteReducer,
} from "./reducers/courseReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userVerifyEmail: userVerifyEmailReducer,
  userForgotPassword: userForgotPasswordReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  uploadImage: uploadImageReducer,
  createInstitute: createInstituteReducer,
  getAllInstitute: getAllInstituteReducer,
  deleteInstitute: deleteInstituteReducer,
  updateInstitute: updateInstituteReducer,
  createBranch: createBranchReducer,
  getAllBranch: getAllBranchReducer,
  deleteBranch: deleteBranchReducer,
  createBatch: createBatchReducer,
  deleteBatch: deleteBatchReducer,
  getAllBatch: getAllBatchReducer,
  updateBranch: updateBranchReducer,
  instructorRegister: instructorRegisterReducer,
  studentRegister: studentRegisterReducer,
  instructorDisplay: instructorDisplayReducer,
  studentDisplay: studentDisplayReducer,
  courseCreate: courseCreateReducer,
  courseGetAll: courseGetAllReducer,
  courseAddLesson: courseAddLessonReducer,
  courseAddAnnouncement: courseAddAnnouncementReducer,
  courseGetDetails: courseGetDetailsReducer,
  courseDeleteAnnouncement: courseDeleteAnnouncementReducer,
  userDelete: userDeleteReducer,
  courseDeleteLesson: courseDeleteLessonReducer,
  courseDelete: courseDeleteReducer,
  updateBatch: updateBatchReducer,
});

const userInfoFromStorage = window.localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  process.env.NODE_ENV !== "production"
    ? composeWithDevTools(applyMiddleware(...middleware))
    : compose(applyMiddleware(...middleware))
);

export default store;
