/** @format */

import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllInstitute } from "../../../actions/instituteAction";
import { getAllBranch } from "../../../actions/branchAction";
import {
  createBatch,
  deleteBatch,
  getAllBatch,
  updateBatch,
} from "../../../actions/batchAction";
import Meta from "../../../components/Meta";

const Batch = () => {
  const [section, setSection] = useState("");
  const [year, setYear] = useState("");

  const [institute, setInstitute] = useState("");
  const [branch, setBranch] = useState("");
  const [editBatchId, setEditBatchId] = useState("");
  const [editBranchId, setEditBranchId] = useState("");
  const [editInstituteId, setEditInstituteId] = useState("");

  const [editYear, setEditYear] = useState("");
  const [editSection, setEditSection] = useState("");

  const { branches } = useSelector((state) => state.getAllBranch);
  const { batch } = useSelector((state) => state.createBatch);
  const { institutes } = useSelector((state) => state.getAllInstitute);
  const { batches } = useSelector((state) => state.getAllBatch);
  const { deleteSuccess } = useSelector((state) => state.deleteBatch);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllInstitute());
    dispatch(getAllBranch());
    dispatch(getAllBatch());
  }, [dispatch, deleteSuccess, batch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBatch(institute, branch, year, section));
    setInstitute("");
    setBranch("");
    setYear("");
    setSection("");
  };

  let years = [];
  for (
    let i = new Date().getFullYear() - 4;
    i <= new Date().getFullYear();
    i++
  ) {
    years.push(i);
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete ?")) {
      dispatch(deleteBatch(id));
    }
  };

  const handleEdit = (institute, branch, year, section, id) => {
    setShowModal(true);
    setEditInstituteId(institute);
    setEditBranchId(branch);
    setEditYear(year);
    setEditSection(section);
    setEditBatchId(id);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateBatch(
        editInstituteId,
        editBranchId,
        editSection,
        editYear,
        editBatchId
      )
    );
    setShowModal(false);
  };

  return (
    <>
      <Meta title="Kakshaa : Batches" />
      <h2 className="text-center">Batch</h2>
      <div className="underline"></div>
      <div className="container">
        <div className="row">
          <Form className="mt-3 mb-5" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <div className="row justify-content-center">
                <div className="col-md-11">
                  <Form.Select
                    className="mb-3"
                    aria-label="Default select example"
                    value={institute}
                    onChange={(e) => {
                      setInstitute(e.target.value);
                      setBranch("");
                      setYear("");
                      setSection("");
                    }}
                  >
                    <option value="">Select Institute</option>
                    {institutes &&
                      institutes.map((i) => (
                        <option key={i._id} value={i._id}>
                          {i.name}
                        </option>
                      ))}
                  </Form.Select>

                  {institute !== "" && (
                    <Form.Select
                      className="mb-3"
                      aria-label="Default select example"
                      value={branch}
                      onChange={(e) => {
                        setBranch(e.target.value);
                        setYear("");
                        setSection("");
                      }}
                    >
                      <option value="">Select Branch</option>
                      {branches &&
                        branches
                          .filter((b) => b.institute._id === institute)
                          .map((i) => (
                            <option key={i._id} value={i._id}>
                              {i.name}
                            </option>
                          ))}
                    </Form.Select>
                  )}

                  {institute !== "" && branch !== "" && (
                    <Form.Select
                      className="mb-3"
                      aria-label="Default select example"
                      value={year}
                      onChange={(e) => {
                        setYear(e.target.value);
                        setSection("");
                      }}
                    >
                      <option value="">Select Year</option>
                      {years.map((i, indx) => (
                        <option key={indx} value={i}>
                          {i}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                  {institute !== "" && branch !== "" && year !== "" && (
                    <Form.Control
                      type="text"
                      placeholder="Enter Section Name"
                      value={section}
                      onChange={(e) => setSection(e.target.value)}
                    />
                  )}
                </div>
                <div className="col-md-1">
                  <button
                    type="submit"
                    className="btn btn-success btn-md"
                    onClick={handleSubmit}
                  >
                    Create
                  </button>
                </div>
              </div>
            </Form.Group>
          </Form>
        </div>
      </div>
      <div className="row container">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">S. no</th>
                <th scope="col">Institute</th>
                <th scope="col">Branch</th>
                <th scope="col">Year</th>
                <th scope="col">Section</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {batches &&
                batches.map((i, index) => {
                  return (
                    <tr key={i._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{i.institute && i.institute.name}</td>
                      <td>{i.branch && i.branch.name}</td>
                      <td>{i.year}</td>
                      <td>{i.section}</td>
                      <td>
                        <span
                          className="btn btn-sm"
                          onClick={() =>
                            handleEdit(
                              i.institute._id,
                              i.branch._id,
                              i.year,
                              i.section,
                              i._id
                            )
                          }
                        >
                          <i
                            className="fas fa-edit text-warning"
                            style={{ fontSize: "14px" }}
                          ></i>
                        </span>
                      </td>
                      <td>
                        <span
                          className="btn btn-sm"
                          onClick={() => handleDelete(i._id)}
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
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form onSubmit={handleEditSubmit}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <i className="fas fa-edit"></i>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <div className="row justify-content-center">
                <div className="col-md-12">
                  <Form.Select
                    className="mb-3"
                    aria-label="Default select example"
                    value={editInstituteId}
                    onChange={(e) => {
                      setEditInstituteId(e.target.value);
                      setEditBranchId("");
                      setEditYear("");
                      setEditSection("");
                    }}
                  >
                    <option value="">Select Institute</option>
                    {institutes &&
                      institutes.map((i) => (
                        <option key={i._id} value={i._id}>
                          {i.name}
                        </option>
                      ))}
                  </Form.Select>
                  <Form.Select
                    className="mb-3"
                    aria-label="Default select example"
                    value={editBranchId}
                    onChange={(e) => {
                      setEditBranchId(e.target.value);
                      setEditYear("");
                      setEditSection("");
                    }}
                  >
                    <option value="">Select Branch</option>
                    {branches &&
                      branches
                        .filter((b) => b.institute._id === editInstituteId)
                        .map((i) => (
                          <option key={i._id} value={i._id}>
                            {i.name}
                          </option>
                        ))}
                  </Form.Select>

                  <Form.Select
                    className="mb-3"
                    aria-label="Default select example"
                    value={editYear}
                    onChange={(e) => {
                      setEditYear(e.target.value);
                      setEditSection("");
                    }}
                  >
                    <option value="">Select Year</option>
                    {years.map((i, indx) => (
                      <option key={indx} value={i}>
                        {i}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control
                    type="text"
                    placeholder="Enter Section Name"
                    value={editSection}
                    onChange={(e) => setEditSection(e.target.value)}
                  />
                </div>
              </div>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={(e) => handleEditSubmit(e)}
              className="btn btn-success"
              type="submit"
            >
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Batch;
