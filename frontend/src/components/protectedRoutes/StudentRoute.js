/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import LoadingToRedirect from "../LoadingToRedirect";
import Loading from "../Loading";
import { Route } from "react-router-dom";

const StudentRoute = ({ children, ...rest }) => {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const isValidStudent = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/student/isvalid", {}, config);
      if (data.success === true) setOk(true);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setOk(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    isValidStudent();
    // eslint-disable-next-line
  }, []);

  return loading ? (
    <Loading />
  ) : ok ? (
    <Route {...rest} />
  ) : (
    <LoadingToRedirect />
  );
};

export default StudentRoute;
