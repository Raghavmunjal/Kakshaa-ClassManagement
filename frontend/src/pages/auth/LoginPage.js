/** @format */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Meta from "../../components/Meta";
import { Link } from "react-router-dom";
import { login } from "../../actions/userAction";
import { Row, Col, Button, Form, InputGroup, Container } from "react-bootstrap";
import signIn from "../../images/signin.svg";

const LoginPage = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password, history));
  };

  useEffect(() => {
    if (userInfo && userInfo.role) {
      history.push(`/${userInfo.role.toLowerCase()}/dashboard`);
    }
  }, [history, userInfo]);

  return (
    <div>
      <Meta title="Kakshaa : Login" />
      <Container>
        <Row>
          <Col sm={12} md={4} lg={4} xl={4} className="my-auto ms-auto">
            <h3 className="text-success">Sign In</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email" className="mt-3">
                <Form.Control
                  type="email"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password" className="mt-4">
                <InputGroup className="mb-3">
                  <Form.Control
                    type={visible ? "text" : "password"}
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                  <InputGroup.Text
                    onClick={() => setVisible(!visible)}
                    className="pointer"
                  >
                    {visible ? (
                      <i className="fas fa-eye"></i>
                    ) : (
                      <i className="fas fa-eye-slash"></i>
                    )}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Button type="submit" className=" btn btn-success btn-md mt-3">
                Sign In
              </Button>
            </Form>
            <Row className="py-2">
              <Col>
                <Link
                  to="/forgot-password"
                  className="text-muted"
                  style={{ textDecoration: "none" }}
                >
                  Forget Password ?
                </Link>
              </Col>
            </Row>
          </Col>
          <Col
            sm={12}
            md={5}
            lg={5}
            xl={5}
            //style={{ backgroundColor: "#F3F1F6" }}
            style={{ marginTop: "3rem" }}
            className="ms-auto"
          >
            <img src={signIn} alt="signIn" className="login-img" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
