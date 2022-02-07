import React from "react";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import home from "../images/home.svg";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <>
      <Meta title="Home" />

      <div className="container page">
        <div className="info">
          <h1>
            Class <span style={{ color: "#02b875" }}>Management</span>
          </h1>
          <p style={{ color: "hsl(210, 22%, 49%)" }}>
            A Bridge between Students and the Education. The Responsive
            Classroom approach creates an ideal environment for learning, every
            teacher should know about it.
          </p>
          <Link
            to={
              userInfo && userInfo.role
                ? `/${userInfo.role.toLowerCase()}/dashboard`
                : "/login"
            }
            className="btn btn-success"
          >
            {userInfo && userInfo.role
              ? `Hey ${userInfo.name}`
              : "Login to acess your account"}
          </Link>
        </div>
        <div style={{ marginTop: "3rem" }}>
          <img src={home} alt="home" className="home-img" />
        </div>
      </div>
    </>
  );
};

export default HomePage;
