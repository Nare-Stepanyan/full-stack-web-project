import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Form, Col, Button } from "react-bootstrap";

function SingleProvider({ provider }) {
  return (
    <div className="providerList">
      <Col sm={6}>
        <Form.Check type="checkbox" label={provider} />
      </Col>
      <Col sm={1}>
        <Button variant="custom">
          <FontAwesomeIcon icon={faEdit} style={{ color: "#17a2b8" }} />
        </Button>
      </Col>
      <Col sm={1}>
        <Button variant="custom">
          <FontAwesomeIcon icon={faTrash} style={{ color: "#d11a2a" }} />
        </Button>
      </Col>
    </div>
  );
}

export default SingleProvider;
