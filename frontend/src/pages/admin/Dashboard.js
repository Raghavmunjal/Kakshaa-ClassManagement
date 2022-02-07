/** @format */

import React, { useState } from "react";
import RegisterModal from "../../components/modals/RegisterModal";
import CreateModal from "../../components/modals/CreateModal";
import DisplayModal from "../../components/modals/DisplayModal";
import register from "../../images/register.svg";
import create from "../../images/create.svg";
import users from "../../images/users.svg";
import Meta from "../../components/Meta";
import { Card, Col, Row } from "react-bootstrap";

const Dashboard = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDisplayModal, setShowDisplayModal] = useState(false);

  return (
    <>
      <Meta title="Kakshaa : Admin Dashboard" />
      <h2 className="text-center">Dashboard</h2>
      <div className="underline"></div>

      <Row className="justify-content-evenly p-5">
        <Col sm={12} md={6} lg={4} xl={3}>
          <Card
            className="border-success mb-3 pointer"
            onClick={() => setShowRegisterModal(true)}
          >
            <Card.Header>
              <Card.Img
                src={register}
                variant="top"
                style={{ width: "100%", height: "200px" }}
              />
            </Card.Header>

            <Card.Body>
              <Card.Title as="h5" className="text-dark text-center mb-3">
                Register
              </Card.Title>

              <Card.Text as="p" className="text-muted text-center">
                Student | Instructor
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={6} lg={4} xl={3}>
          <Card
            className="border-success mb-3 pointer"
            onClick={() => setShowCreateModal(true)}
          >
            <Card.Header>
              <Card.Img
                src={create}
                variant="top"
                style={{ width: "100%", height: "200px" }}
              />
            </Card.Header>

            <Card.Body>
              <Card.Title as="h5" className="text-dark text-center mb-3">
                Create
              </Card.Title>

              <Card.Text as="p" className="text-muted text-center">
                Institute | Batch
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={6} lg={4} xl={3}>
          <Card
            className="border-success mb-3 pointer"
            onClick={() => setShowDisplayModal(true)}
          >
            <Card.Header>
              <Card.Img
                src={users}
                variant="top"
                style={{ width: "100%", height: "200px" }}
              />
            </Card.Header>

            <Card.Body>
              <Card.Title as="h5" className="text-dark text-center mb-3">
                Display
              </Card.Title>

              <Card.Text as="p" className="text-muted text-center">
                Student | Instructor
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <RegisterModal
        show={showRegisterModal}
        onHide={() => setShowRegisterModal(false)}
      />
      <CreateModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
      />
      <DisplayModal
        show={showDisplayModal}
        onHide={() => setShowDisplayModal(false)}
      />
    </>
  );
};

export default Dashboard;
