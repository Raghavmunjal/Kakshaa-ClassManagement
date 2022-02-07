/** @format */

import React, { useEffect, useState } from "react";
import { getUserDetails, updateUserProfile } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Meta from "../../components/Meta";
import Loading from "../../components/Loading";
import { Row, Col, Button, Form, Container, Badge } from "react-bootstrap";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const UserUpdateProfilePage = ({ match, history }) => {
  const { id } = match.params;

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preview, setPreview] = useState();

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading } = userDetails;
  const userUpdate = useSelector((state) => state.userUpdate);
  const { success } = userUpdate;

  useEffect(() => {
    if (success) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(getUserDetails(id));
      history.push("/");
    } else if (!user || user._id !== id) dispatch(getUserDetails(id));
    else {
      setName(user.name);
      setPhone(user.phone);
      setEmail(user.email);
      setPreview(user && user.image && user.image.Location);
    }
  }, [id, dispatch, user, success, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserProfile(name, phone));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Meta title="Kakshaa : Update Profile" />
      {loading ? (
        <Loading />
      ) : (
        <Container className="mt-5">
          <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
              <div
                className="card p-5"
                style={{ boxShadow: "0px 0 18px rgba(55, 66, 59, 0.08)" }}
              >
                <Form onSubmit={handleSubmit}>
                  <h2>Update Profile</h2>
                  <div className="underline2"></div>
                  <div className="form-row mt-4">
                    <div className="col">
                      <div className="form-group">
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

                  <Form.Group controlId="formGridId" className="mt-4">
                    <Form.Label>Id</Form.Label>
                    <Form.Control
                      type="text"
                      value={id}
                      name="id"
                      disabled
                      required
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="formGridEmail" className="mt-4">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      name="email"
                      disabled
                      required
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="formGridName" className="mt-4">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={name}
                      placeholder="John Doe"
                      onChange={(e) => setName(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="phone" className="mt-4">
                    <Form.Label>Mobile No.</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      placeholder="XXXX-XX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>

                  <Button
                    type="submit"
                    className=" btn btn-success btn-md mt-4"
                  >
                    Update
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default UserUpdateProfilePage;
