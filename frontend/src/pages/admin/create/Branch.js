/** @format */

import React, { useState, useEffect } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllInstitute } from "../../../actions/instituteAction";
import {
  createBranch,
  deleteBranch,
  getAllBranch,
  updateBranch,
} from "../../../actions/branchAction";
import Meta from "../../../components/Meta";

const Branch = () => {
  const [name, setName] = useState("");
  const [institute, setInstitute] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editBranchName, setEditBranchName] = useState("");
  const [editBranchId, setEditBranchId] = useState("");
  const [editInstituteId, setEditInstituteId] = useState("");

  const dispatch = useDispatch();
  const { branches } = useSelector((state) => state.getAllBranch);
  const { branch } = useSelector((state) => state.createBranch);
  const { deleteSuccess } = useSelector((state) => state.deleteBranch);

  const { institutes } = useSelector((state) => state.getAllInstitute);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBranch(name, institute));
    setName("");
    setInstitute(0);
  };

  const handleDelete = (slug) => {
    if (window.confirm("Are you sure you want to delete ?")) {
      dispatch(deleteBranch(slug));
    }
  };

  const handleEdit = (branch, id, instituteId) => {
    setShowModal(true);
    setEditBranchId(id);
    setEditBranchName(branch);
    setEditInstituteId(instituteId);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBranch(editBranchId, editBranchName, editInstituteId));
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(getAllInstitute());
    dispatch(getAllBranch());
  }, [institute, deleteSuccess, branch, dispatch]);

  return (
    <>
      <Meta title="Kakshaa : Branches" />
      <h2 className="text-center">Branch</h2>
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
                    onChange={(e) => setInstitute(e.target.value)}
                  >
                    <option value="0">Select Institute</option>
                    {institutes &&
                      institutes.map((i) => (
                        <option key={i._id} value={i._id}>
                          {i.name}
                        </option>
                      ))}
                  </Form.Select>
                  <Form.Control
                    type="text"
                    placeholder="Enter Branch Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col-md-1">
                  <button
                    type="submit"
                    className="btn btn-success btn-md"
                    onClick={(e) => handleSubmit(e)}
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
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {branches &&
                branches.map((i, index) => {
                  return (
                    <tr key={i._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{i.institute && i.institute.name}</td>
                      <td>{i.name}</td>
                      <td>
                        <span
                          className="btn btn-sm"
                          onClick={() =>
                            handleEdit(
                              i.name,
                              i._id,
                              i.institute && i.institute._id
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
                          onClick={() => handleDelete(i.slug)}
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
                    onChange={(e) => setEditInstituteId(e.target.value)}
                  >
                    {institutes &&
                      institutes.map((i) => (
                        <option key={i._id} value={i._id}>
                          {i.name}
                        </option>
                      ))}
                  </Form.Select>
                  <Form.Control
                    type="text"
                    placeholder="Enter Branch Name"
                    value={editBranchName}
                    onChange={(e) => setEditBranchName(e.target.value)}
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

export default Branch;
