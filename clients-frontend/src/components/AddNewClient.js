import React, { PureComponent } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import ProviderList from "./ProviderList";

class AddNewClient extends PureComponent {
  render() {
    return (
      <Modal show={true} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#17a2b8" }}>New Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="formHorizontalName">
              <Form.Label column sm={2}>
                Name:
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="name" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                Email:
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="email" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalPhone">
              <Form.Label column sm={2}>
                Phone:
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="phone" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalProviders">
              <Form.Label column sm={2}>
                Providers:
              </Form.Label>
              <Col sm={6}>
                <Form.Control type="providers" />
              </Col>
              <Col sm={4}>
                <Button variant="light">Add Provider</Button>
              </Col>
            </Form.Group>
            <fieldset>
              <Form.Group as={Row}>
                <Form.Label column sm={2}></Form.Label>
                <Col sm={8}>
                  <ProviderList providers={this.props.providers} />
                </Col>
              </Form.Group>
            </fieldset>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light">Cancel</Button>
          <Button variant="info">Add Client</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddNewClient;
