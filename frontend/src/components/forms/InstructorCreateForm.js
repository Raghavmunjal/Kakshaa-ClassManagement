import React from "react";
import {
  Row,
  Col,
  Button,
  Form,
  Container,
  Badge,
  Spinner,
} from "react-bootstrap";

const InstructorCreateForm = ({
  handleSubmit,
  handleImage,
  values,
  uploadedButtonText,
  handleChange,
  uploading,
  preview,
}) => {
  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <div
              className="card p-5"
              style={{ boxShadow: "0px 0 18px rgba(55, 66, 59, 0.08)" }}
            >
              <Form onSubmit={handleSubmit}>
                <h2>Create Instructor</h2>
                <div className="underline2"></div>
                <div className="form-row mt-3">
                  <div className="col">
                    <div className="form-group">
                      <label className="btn btn-outline-success btn-block">
                        {uploading ? (
                          <>
                            <Spinner
                              as="span"
                              animation="grow"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                            Uploading..
                          </>
                        ) : (
                          uploadedButtonText
                        )}
                        <input
                          type="file"
                          name="image"
                          onChange={handleImage}
                          accept="image/*"
                          hidden
                          disabled={uploading}
                        />
                      </label>
                      {preview !== "" && (
                        <Badge pill className="pointer" as="img-badge">
                          <img
                            src={preview}
                            alt="preview"
                            className="m-2"
                            style={{
                              width: "80px",
                              objectFit: "cover",
                            }}
                          />
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <Row className="mb-4 mt-4">
                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={values.email}
                      name="email"
                      placeholder="name@example.com"
                      onChange={handleChange}
                      required
                    ></Form.Control>
                  </Form.Group>
                </Row>

                <Form.Group controlId="phone" className="mt-3">
                  <Form.Label>Mobile No.</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    placeholder="XXXX-XX"
                    value={values.phone}
                    onChange={handleChange}
                    required
                  ></Form.Control>
                </Form.Group>

                <Button
                  type="submit"
                  className=" btn btn-success btn-md mt-4"
                  disabled={!values.email || !values.phone || !values.name}
                >
                  Save
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default InstructorCreateForm;
