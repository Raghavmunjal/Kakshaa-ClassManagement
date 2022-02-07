/** @format */

import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const DisplayModal = (props) => {
  return (
    <Modal
      {...props}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          <i className='fas fa-users'></i>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='row justify-content-center'>
          <div className='col-md-5'>
            <div className='card border-success mb-3 pointer'>
              <div className='card-body text-center'>
                <h4 className='blockquote '>Student</h4>
                <Link to='/admin/display/student'>
                  <button type='button' className='btn btn-outline-success'>
                    Display
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className='col-md-5'>
            <div className='card border-success mb-3 pointer'>
              <div className='card-body text-center'>
                <h4 className='blockquote '>Instructor</h4>
                <Link to='/admin/display/instructor'>
                  <button type='button' className='btn btn-outline-success'>
                    Display
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className='btn btn-success'>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DisplayModal;
