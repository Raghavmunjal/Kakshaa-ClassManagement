/** @format */

import React, { useEffect, useState } from "react";
import { displayStudent } from "../../../actions/adminAction";
import { useSelector, useDispatch } from "react-redux";
import { getAllBatch } from "../../../actions/batchAction";
import { getAllBranch } from "../../../actions/branchAction";
import { getAllInstitute } from "../../../actions/instituteAction";
import { Row, Col, Form, Container } from "react-bootstrap";
import { deleteUser } from "../../../actions/userAction";
import Meta from "../../../components/Meta";
import Loading from "../../../components/Loading";

const Student = () => {
  const [institute, setInstitute] = useState("");
  const [branch, setBranch] = useState("");
  const [section, setSection] = useState("");
  const [year, setYear] = useState("");

  const dispatch = useDispatch();
  const { students, loading: loadingStudents } = useSelector(
    (state) => state.studentDisplay
  );
  const { branches, loading: loadingBranches } = useSelector(
    (state) => state.getAllBranch
  );
  const { institutes, loading: loadingInstitutes } = useSelector(
    (state) => state.getAllInstitute
  );
  const { batches, loading: loadingBatches } = useSelector(
    (state) => state.getAllBatch
  );

  useEffect(() => {
    dispatch(displayStudent());
    dispatch(getAllInstitute());
    dispatch(getAllBranch());
    dispatch(getAllBatch());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete ?")) {
      const role = "student";
      dispatch(deleteUser(id, role));
    }
  };

  const uniqueYear = (batches) => {
    const arr = batches.filter(
      (b) => b.institute._id === institute && b.branch._id === branch
    );
    const result = [...new Set(arr.map((data) => data.year))];
    return result.map((b, i) => (
      <option key={i} value={b}>
        {b}
      </option>
    ));
  };

  return (
    <>
      <Meta title="Kakshaa : Students" />
      {loadingStudents ? (
        <Loading />
      ) : loadingInstitutes ? (
        <Loading />
      ) : loadingBranches ? (
        <Loading />
      ) : loadingBatches ? (
        <Loading />
      ) : (
        <Container className="mt-3">
          <Row className="mb-3 mt-4">
            <Form.Group as={Col} controlId="formGridInstitute">
              <Form.Label>Institute</Form.Label>
              <Form.Select
                className="text-muted"
                value={institute}
                onChange={(e) => {
                  setInstitute(e.target.value);
                  setBranch("");
                  setSection("");
                  setYear("");
                }}
              >
                <option value="">Select</option>
                {institutes &&
                  institutes.map((i) => (
                    <option key={i._id} value={i._id}>
                      {i.abbreviation} ({i.name})
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            {institute.length > 0 && (
              <Form.Group as={Col} controlId="formGridBranch">
                <Form.Label>Branch</Form.Label>
                <Form.Select
                  className="text-muted"
                  value={branch}
                  onChange={(e) => {
                    setBranch(e.target.value);
                    setSection("");
                    setYear("");
                  }}
                >
                  <option value="">Select</option>
                  {branches &&
                    branches
                      .filter((b) => b.institute._id === institute)
                      .map((b) => (
                        <option key={b._id} value={b._id}>
                          {b.name}
                        </option>
                      ))}
                </Form.Select>
              </Form.Group>
            )}

            {institute.length > 0 && branch.length > 0 && (
              <Form.Group as={Col} controlId="formGridSection">
                <Form.Label>Year</Form.Label>
                <Form.Select
                  className="text-muted"
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                    setSection("");
                  }}
                >
                  <option value="">Select</option>
                  {batches && batches.length > 0 && uniqueYear(batches)}
                </Form.Select>
              </Form.Group>
            )}

            {institute.length > 0 && branch.length > 0 && year.length > 0 && (
              <Form.Group as={Col} controlId="formGridSection">
                <Form.Label>Section</Form.Label>
                <Form.Select
                  className="text-muted"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                >
                  <option value="">Select</option>
                  {batches &&
                    batches.length > 0 &&
                    batches
                      .filter(
                        (b) =>
                          b.institute._id === institute &&
                          b.branch._id === branch &&
                          b.year === year
                      )
                      .map((b) => (
                        <option key={b._id} value={b.section}>
                          {b.section}
                        </option>
                      ))}
                </Form.Select>
              </Form.Group>
            )}
          </Row>
          {students && students.length > 0 ? (
            <Row className="mb-4 mt-5">
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
                    {institute.length > 0 &&
                      branch.length > 0 &&
                      year.length > 0 &&
                      section.length > 0 &&
                      students
                        .filter(
                          (s) =>
                            s.batch.institute === institute &&
                            s.batch.branch === branch &&
                            s.batch.year === year &&
                            s.batch.section === section
                        )
                        .map((s, index) => {
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

                    {institute.length > 0 &&
                      branch.length > 0 &&
                      year.length > 0 &&
                      !section &&
                      students
                        .filter(
                          (s) =>
                            s.batch.institute === institute &&
                            s.batch.branch === branch &&
                            s.batch.year === year
                        )
                        .map((s, index) => {
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

                    {institute.length > 0 &&
                      branch.length > 0 &&
                      !year &&
                      !section &&
                      students
                        .filter(
                          (s) =>
                            s.batch.institute === institute &&
                            s.batch.branch === branch
                        )
                        .map((s, index) => {
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

                    {institute.length > 0 &&
                      !branch &&
                      !year &&
                      !section &&
                      students
                        .filter((s) => s.batch.institute === institute)
                        .map((s, index) => {
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
          ) : (
            ""
          )}
        </Container>
      )}
    </>
  );
};

export default Student;
