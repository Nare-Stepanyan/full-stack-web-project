import React from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

function DeleteClientModal({ confirmDelete }) {
  return (
    <>
      <Modal show={true} onHide={confirmDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure to delete this client?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="danger" onClick={() => console.log("id")}>
            Delete
          </Button>
          <Button variant="primary" onClick={confirmDelete}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

DeleteClientModal.propTypes = {
  confirmDelete: PropTypes.func.isRequired,
  // deleteProvider: PropTypes.func.isRequired,
  // id: PropTypes.string.isRequired,
};

export default DeleteClientModal;
