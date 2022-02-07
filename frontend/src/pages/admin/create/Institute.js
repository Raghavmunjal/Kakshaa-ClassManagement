/** @format */

import React, { useState, useEffect } from "react";
import { Form, Modal, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateInstitute } from "../../../actions/instituteAction";
import {
  createInstitute,
  deleteInstitute,
  getAllInstitute,
} from "../../../actions/instituteAction";
import Meta from "../../../components/Meta";

const Institute = () => {
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editInstituteName, setEditInstituteName] = useState("");
  const [editInstituteId, setEditInstituteId] = useState("");

  const dispatch = useDispatch();
  const { institutes } = useSelector((state) => state.getAllInstitute);
  const { institute } = useSelector((state) => state.createInstitute);
  const { deleteSuccess } = useSelector((state) => state.deleteInstitute);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createInstitute(name));
    setName("");
  };

  const handleDelete = (slug) => {
    if (window.confirm("Are you sure you want to delete ?")) {
      dispatch(deleteInstitute(slug));
    }
  };

  const handleEdit = (name, id) => {
    setShowModal(true);
    setEditInstituteId(id);
    setEditInstituteName(name);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(updateInstitute(editInstituteId, editInstituteName));
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(getAllInstitute());
  }, [institute, deleteSuccess, dispatch]);

  return (
    <>
      <Meta title="Kakshaa : Institute" />
      <h2 className="text-center">Institute</h2>
      <div className="underline"></div>
      <div className="container">
        <div className="row">
          <Form className="mt-3 mb-5" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <div className="row justify-content-center">
                <div className="col-md-11">
                  <Form.Control
                    type="text"
                    placeholder="Enter Institute Name"
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
                <th scope="col">Institute name</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {institutes &&
                institutes.map((i, index) => {
                  return (
                    <tr key={i._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{i.name}</td>
                      <td>
                        <span
                          className="btn btn-sm"
                          onClick={() => handleEdit(i.name, i._id)}
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
            <Form.Group
              as={Col}
              controlId="formGridEmail"
              className="mt-3 mb-3"
            >
              <div className="row justify-content-center">
                <div className="col-md-12">
                  <Form.Control
                    type="text"
                    placeholder="Enter Institute Name"
                    value={editInstituteName}
                    onChange={(e) => setEditInstituteName(e.target.value)}
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

export default Institute;
