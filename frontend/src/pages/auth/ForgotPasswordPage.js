/** @format */

import React, { useState, useEffect } from "react";
import Meta from "../../components/Meta";
import { Row, Col, Button, Form, Container, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail, forgotPassword } from "../../actions/userAction";
import {
  USER_FORGOT_PASSWORD_RESET,
  USER_VERIFY_EMAIL_RESET,
} from "../../constants/userConstants";
import Loading from "../../components/Loading";
import forgot from "../../images/forgot.svg";

const ForgotPasswordPage = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [success, setSuccess] = useState(false);
  const [visible, setVisible] = useState(false);

  const userVerifyEmail = useSelector((state) => state.userVerifyEmail);
  const { otp: hashCode, loading: loadingOtp } = userVerifyEmail;

  const userForgotPassword = useSelector((state) => state.userForgotPassword);
  const { loading: loadingForgot, success: successForgotPassword } =
    userForgotPassword;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successForgotPassword && successForgotPassword === true) {
      history.push("/login");
      toast.success("Password Reset Successfully. Now you can Login");
      dispatch({ type: USER_VERIFY_EMAIL_RESET });
      dispatch({ type: USER_FORGOT_PASSWORD_RESET });
      setSuccess(false);
    }
  }, [successForgotPassword, dispatch, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!otp) {
        toast.error("Otp is required");
        return;
      }
      dispatch(forgotPassword(email, password, otp, hashCode));
    } catch (error) {
      console.log(error);
      return;
    }
  };
  const handleOtp = (e) => {
    e.preventDefault();
    toast.success(`otp sent on ${email}`);
    dispatch(verifyEmail(email));
    setSuccess(true);
  };

  return (
    <div>
      <Meta title="Forgot Password ?" />
      {loadingOtp ? (
        <Loading />
      ) : loadingForgot ? (
        <Loading />
      ) : (
        <Container>
          <Row>
            <Col sm={12} md={4} lg={4} xl={4} className="my-auto ms-auto">
              <h3 className="text-success">Forgot Password ?</h3>

              <Form onSubmit={success ? handleSubmit : handleOtp}>
                <Form.Group controlId="email" className="mt-4">
                  <InputGroup hasValidation>
                    <Form.Control
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={success}
                      required
                      isInvalid={!email}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Enter the Email Associated with your account
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                {success && (
                  <>
                    <Form.Group controlId="otp" className="mt-4">
                      <Form.Control
                        type="text"
                        placeholder="Enter Otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
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
                  </>
                )}
                <Button
                  type="submit"
                  className="btn btn-success btn-md mt-3"
                  disabled={!email || loadingOtp || loadingForgot}
                  onClick={success ? handleSubmit : handleOtp}
                >
                  {success ? "Reset Password" : "Send Otp"}
                </Button>
              </Form>
            </Col>
            <Col
              sm={12}
              md={6}
              lg={6}
              xl={6}
              //style={{ backgroundColor: "#F3F1F6" }}
              style={{ marginTop: "3rem" }}
              className="ms-auto"
            >
              <img src={forgot} alt="signIn" className="login-img" />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
