import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import "./bootstrap.min.css";
import axios from "axios";
import { logout } from "./actions/userAction";

// axios.interceptors.response.use(
//   function (response) {
//     // Any status code that lies within the range of 2xx use this function to trigger
//     console.log("RESPONSE");
//     return response;
//   },

//   function (error) {
//     //Any status code that lies outside the range of 2xx use this function to trigger
//     let res = error.response;
//     if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
//       dispatch(logout());
//     }
//     return Promise.reject(error);
//   }
// );

/** Intercept any unauthorized request.
 * dispatch logout action accordingly **/
const UNAUTHORIZED = 500;
const { dispatch } = store; // direct access to redux store.
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status, data, config } = error.response;
    if (
      status === UNAUTHORIZED &&
      data.message === "jwt expired" &&
      config &&
      !config.__isRetryRequest
    ) {
      dispatch(logout());
    }
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
