import React, { PureComponent } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import ProviderList from "./ProviderList";
import PropTypes from "prop-types";

class AddNewClient extends PureComponent {
  state = {
    providerInput: "",
  };
  handleClick = () => {
    this.props.addNewProvider(this.state.providerInput);
    this.setState({
      providerInput: "",
    });
  };
  handleChange = (e) => {
    const input = e.target.value;
    this.setState({
      providerInput: input,
    });
  };
  render() {
    const { onClose, providers, deleteProvider, saveEditedProvider } =
      this.props;
    const { providerInput } = this.state;
    return (
      <Modal show={true} centered>
        <Modal.Header>
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
                <Form.Control
                  type="providers"
                  value={providerInput}
                  onChange={this.handleChange}
                />
              </Col>
              <Col sm={4}>
                <Button variant="light" onClick={this.handleClick}>
                  Add Provider
                </Button>
              </Col>
            </Form.Group>
            <fieldset>
              <Form.Group as={Row}>
                <Form.Label column sm={2}></Form.Label>
                <Col sm={8}>
                  <ProviderList
                    providers={providers}
                    deleteProvider={deleteProvider}
                    saveEditedProvider={saveEditedProvider}
                  />
                </Col>
              </Form.Group>
            </fieldset>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="info">Add Client</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

AddNewClient.propTypes = {
  providers: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  addNewProvider: PropTypes.func.isRequired,
  deleteProvider: PropTypes.func.isRequired,
  saveEditedProvider: PropTypes.func.isRequired,
};

export default AddNewClient;
