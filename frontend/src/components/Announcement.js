/** @format */

import React from "react";
import { Button, Col, Form, Modal, Row, Card, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteAnnouncement } from "../actions/courseAction";

const Announcement = ({
  role,
  course,
  setShowAnnouncementModal,
  announcementValues,
  handleFileUpload,
  handleAnnouncementSubmit,
  setAnnouncementValues,
  showAnnouncementModal,
  uploading,
}) => {
  const dispatch = useDispatch();

  const handleDelete = (courseId, id) => {
    if (window.confirm("Are you sure you want to delete ?")) {
      const slug = course && course.slug;
      dispatch(deleteAnnouncement(courseId, id, slug));
    }
  };

  return (
    <div>
      {course && course.announcements && course.announcements.length <= 0 && (
        <p className="text-muted" style={{ letterSpacing: ".75px" }}>
          No Announcements yet
        </p>
      )}
      {course.announcements &&
        course.announcements.length > 0 &&
        course.announcements.map((c, i) => (
          <div key={c._id} className="mt-2">
            <Card>
              <Card.Body>
                {c.description}
                <span className="text-muted text-end">
                  &nbsp;({c.uploadedAt.substring(0, 10)})
                </span>

                {role !== "student" && (
                  <span
                    style={{ marginLeft: "90%", marginTop: "-53px" }}
                    className="btn btn-sm"
                    onClick={() => handleDelete(course._id, c._id)}
                  >
                    <i
                      className="fas fa-trash text-danger"
                      style={{ fontSize: "16px" }}
                    ></i>
                  </span>
                )}
              </Card.Body>
              {c.file && (
                <a
                  href={c.file.Location}
                  target="_blank"
                  style={{ marginTop: "-14px" }}
                >
                  <Button variant="outline-success" className="mx-3 mb-4">
                    See Document
                  </Button>
                </a>
              )}
            </Card>
          </div>
        ))}
      {role !== "student" && (
        <>
          <Button
            type="button"
            className="btn btn-success mt-4"
            onClick={() => setShowAnnouncementModal(true)}
          >
            Add Announcement +
          </Button>
          <Modal
            show={showAnnouncementModal}
            onHide={() => setShowAnnouncementModal(false)}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Form onSubmit={handleAnnouncementSubmit}>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  <i className="fas fa-file-pdf"></i>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="form-row mt-3">
                  <div className="col">
                    <div className="form-group">
                      <label className="btn btn-outline-success btn-block">
                        {uploading ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />{" "}
                            Uploading..
                          </>
                        ) : (
                          "Upload File"
                        )}
                        <input
                          type="file"
                          name="file"
                          onChange={handleFileUpload}
                          accept=".pdf"
                          hidden
                        />
                      </label>
                      {/* {progress > 0 && (
                    <ProgressBar
                      striped
                      variant='success'
                      now={progress}
                      label={`${progress}%`}
                    />
                  )} */}
                    </div>
                  </div>
                </div>
                <Row>
                  <Col xs={12} md={12}>
                    <Form.Group
                      as={Col}
                      controlId="formGridEmail"
                      className="mt-3"
                    >
                      <textarea
                        className="form-control"
                        value={announcementValues.description}
                        name="description"
                        placeholder="Add Description"
                        onChange={(e) =>
                          setAnnouncementValues({
                            ...announcementValues,
                            description: e.target.value,
                          })
                        }
                        required
                      ></textarea>
                    </Form.Group>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  onClick={() => setShowAnnouncementModal(false)}
                  className="btn btn-success"
                  type="submit"
                >
                  Upload
                </Button>
                <Button
                  onClick={() => setShowAnnouncementModal(false)}
                  className="btn btn-success"
                >
                  Close
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Announcement;
