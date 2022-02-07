/** @format */

import React, { useEffect } from "react";
import { displayInstructor } from "../../../actions/adminAction";
import { useSelector, useDispatch } from "react-redux";
import { Row, Container } from "react-bootstrap";
import { deleteUser } from "../../../actions/userAction";
import Meta from "../../../components/Meta";
import Loading from "../../../components/Loading";

const Instructor = () => {
  const dispatch = useDispatch();
  const { instructors, loading } = useSelector(
    (state) => state.instructorDisplay
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete ?")) {
      const role = "instructor";
      dispatch(deleteUser(id, role));
    }
  };

  useEffect(() => {
    dispatch(displayInstructor());
  }, [dispatch]);

  return (
    <>
      <Meta title="Kakshaa : Instructors" />
      {loading ? (
        <Loading />
      ) : (
        <Container className="mt-3">
          <Row className="mb-3 mt-5">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">S. no</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {instructors &&
                    instructors.length > 0 &&
                    instructors.map((s, index) => {
                      return (
                        <tr key={s._id}>
                          <th scope="row">{index + 1}</th>
                          <td>{s.name}</td>
                          <td>{s.phone}</td>
                          <td>{s.email}</td>
                          <td>
                            <span
                              className="btn btn-sm"
                              onClick={() => handleDelete(s._id)}
                            >
                              <i
                                className="fas fa-trash text-danger"
                                style={{ fontSize: "14px" }}
                              ></i>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Instructor;
