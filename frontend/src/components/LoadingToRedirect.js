/** @format */

import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import notAuthorize from "../images/401.svg";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(3);
  const history = useHistory();

  useEffect(() => {
    //set Interval
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    //redirect once count == 0
    count === 0 && history.push("/");

    //clean up function
    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div className="container text-center">
      <img
        src={notAuthorize}
        alt="not Authorize"
        style={{ width: "100%", height: "400px" }}
      />
      <h3>Ohh! Not Authorized</h3>
      <p style={{ color: "hsl(210, 22%, 49%)" }}>
        Sorry you have no rights to access this page.
      </p>
      <Link to="/" style={{ color: "#02b875" }}>
        Back To Home
      </Link>
    </div>
  );
};

export default LoadingToRedirect;
