/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const CreateModal = (props) => {
  return (
    <Modal
      {...props}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          <i className='fas fa-university'></i>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='row justify-content-center'>
          <div className='col-md-4'>
            <div className='card border-success mb-3 pointer'>
              <div className='card-body text-center'>
                <h4 className='blockquote'>Institute</h4>
                <Link to='/admin/create/institute' className='custom-link'>
                  <button type='button' className='btn btn-outline-success'>
                    Create
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='card border-success mb-3 pointer'>
              <div className='card-body text-center'>
                <h4 className='blockquote'>Branch</h4>
                <Link to='/admin/create/branch' className='custom-link'>
                  <button type='button' className='btn btn-outline-success'>
                    Create
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='card border-success mb-3 pointer'>
              <div className='card-body text-center'>
                <h4 className='blockquote'>Batch</h4>
                <Link to='/admin/create/batch' className='custom-link'>
                  <button type='button' className='btn btn-outline-success'>
                    Create
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

export default CreateModal;
