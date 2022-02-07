import React from "react";
import { Spinner } from "react-bootstrap";
const Loading = () => {
  return (
    <div className="col text-center mt-5 p-5">
      <Spinner
        animation="border"
        role="status"
        style={{
          width: "100px",
          height: "100px",
          margin: "auto",
          display: "block",
        }}
        variant="success"
      ></Spinner>
    </div>
  );
};

export default Loading;
