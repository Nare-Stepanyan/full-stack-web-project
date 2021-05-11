import React from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

function EditProviderModal({ handleClose, provider }) {
  return (
    <>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure to remove this provider?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="danger" onClick={console.log(provider)}>
            Remove
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

EditProviderModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  provider: PropTypes.object.isRequired,
};
export default EditProviderModal;
