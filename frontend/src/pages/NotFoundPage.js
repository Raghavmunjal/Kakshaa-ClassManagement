/** @format */

import React from "react";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";
import notFound from "../images/404.svg";

const NotFoundPage = () => {
  return (
    <>
      <Meta title="Kakshaa : Update Profile" />
      <div className="container text-center">
        <img
          src={notFound}
          alt="notfound"
          style={{ width: "100%", height: "400px" }}
        />
        <h3 className="mt-2">Ohh! Page Not Found</h3>
        <p style={{ color: "hsl(210, 22%, 49%)" }}>
          We can't seem to find the page you're looking for
        </p>
        <Link to="/" style={{ color: "#02b875" }}>
          Back To Home
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage;
