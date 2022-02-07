/** @format */

import React from "react";
import ReactPlayer from "react-player";
import { deleteLesson } from "../actions/courseAction";
import { useDispatch } from "react-redux";
import {
  Accordion,
  Button,
  Col,
  Form,
  Modal,
  Row,
  Spinner,
  //ProgressBar,
} from "react-bootstrap";
import { COURSE_DELETE_LESSON_RESET } from "../constants/courseConstants";

const Lesson = ({
  role,
  course,
  setShowLessonModal,
  handleVideoUpload,
  showLessonModal,
  handleSubmit,
  // progress,
  uploading,
  values,
  handleChange,
  uploaded,
}) => {
  const dispatch = useDispatch();
  const handleDelete = (courseId, lessonId) => {
    if (window.confirm("Are you sure you want to delete ?")) {
      const slug = course && course.slug;
      dispatch(deleteLesson(courseId, lessonId, slug));
      dispatch({ type: COURSE_DELETE_LESSON_RESET });
    }
  };

  return (
    <div>
      {course && course.lessons && course.lessons.length <= 0 && (
        <p className="text-muted" style={{ letterSpacing: ".75px" }}>
          No Lessons yet
        </p>
      )}
      {course.lessons &&
        course.lessons.length > 0 &&
        course.lessons.map((c, i) => (
          <div key={c._id}>
            <Accordion>
              <Accordion.Item eventKey={i}>
                <Accordion.Header>
                  {role !== "student" && (
                    <span
                      className="btn btn-sm m-1"
                      onClick={() => handleDelete(course._id, c._id)}
                    >
                      <i
                        className="fas fa-trash text-danger"
                        style={{ fontSize: "16px" }}
                      ></i>
                    </span>
                  )}
                  {c.title} -
                  <span className="text-muted"> &nbsp;{c.description} - </span>
                  <span className="text-muted">
                    &nbsp;({c.uploadedAt.substring(0, 10)})
                  </span>
                </Accordion.Header>
                <Accordion.Body>
                  <ReactPlayer
                    url={c.video.Location}
                    className="react-player-div"
                    width="100%"
                    height="10%"
                    controls
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        ))}
      {role !== "student" && (
        <>
          <Button
            type="button"
            className="btn btn-success mt-4"
            onClick={() => setShowLessonModal(true)}
          >
            Add Lesson +
          </Button>

          <Modal
            show={showLessonModal}
            onHide={() => setShowLessonModal(false)}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  <i className="fas fa-photo-video"></i>
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
                        ) : uploaded ? (
                          "Uploaded"
                        ) : (
                          "Upload video"
                        )}
                        <input
                          type="file"
                          name="video"
                          onChange={handleVideoUpload}
                          accept="video/*"
                          hidden
                          required
                          disabled={uploading}
                        />
                      </label>
                      {!uploaded && (
                        <p className="text-muted mt-2">
                          * Video Uploading may take a while *
                        </p>
                      )}
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
                {uploaded && (
                  <Row>
                    <Col xs={12} md={12}>
                      <Form.Group controlId="title" className="mt-3">
                        <Form.Control
                          type="text"
                          name="title"
                          placeholder="Title"
                          value={values.title}
                          onChange={handleChange}
                          required
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        controlId="formGridEmail"
                        className="mt-3"
                      >
                        <textarea
                          className="form-control"
                          value={values.description}
                          name="description"
                          placeholder="Add Description"
                          onChange={handleChange}
                          required
                        ></textarea>
                      </Form.Group>
                    </Col>
                  </Row>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button
                  onClick={() => setShowLessonModal(false)}
                  className="btn btn-success"
                  type="submit"
                  disabled={!values.video}
                >
                  Upload
                </Button>
                <Button
                  onClick={() => setShowLessonModal(false)}
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

export default Lesson;
