import React, { PureComponent } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import ProviderList from "./ProviderList";
import PropTypes from "prop-types";
import DeleteClientModal from "./DeleteClientModal";

class EditClient extends PureComponent {
  state = {
    ...this.props.client,
    showDeleteModal: false,
    providerInput: "",
  };
  handleNewProvider = () => {
    this.props.addNewProvider(this.state.providerInput);
    this.setState({
      providerInput: "",
    });
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  confirmDelete = () => {
    this.setState({
      showDeleteModal: !this.state.showDeleteModal,
    });
  };
  closeModals = () => {
    this.props.deleteClient(this.state._id);
    this.props.onClose(null);
  };
  render() {
    const { onClose, providers, deleteProvider, saveEditedProvider, onCheck } =
      this.props;
    const { name, email, phone, providerInput, showDeleteModal } = this.state;

    return (
      <>
        <Modal show={true} centered>
          <Modal.Header>
            <Modal.Title style={{ color: "#17a2b8" }}>Edit Client</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group as={Row} controlId="formHorizontalName">
                <Form.Label column sm={2}>
                  Name:
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="name"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                  Email:
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formHorizontalPhone">
                <Form.Label column sm={2}>
                  Phone:
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="phone"
                    name="phone"
                    value={phone}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formHorizontalProviders">
                <Form.Label column sm={2}>
                  Providers:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    type="providers"
                    name="providerInput"
                    value={providerInput}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col sm={4}>
                  <Button variant="light" onClick={this.handleNewProvider}>
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
                      onCheck={onCheck}
                      singleClientProviders={this.state.providers}
                    />
                  </Col>
                </Form.Group>
              </fieldset>
            </Form>
          </Modal.Body>
          <Modal.Footer className="edit-client-btns">
            <div>
              <Button variant="danger" onClick={this.confirmDelete}>
                Delete Client
              </Button>
            </div>
            <div>
              <Button className="cancel-btn" variant="light" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="info">Save Changes</Button>
            </div>
          </Modal.Footer>
        </Modal>
        {showDeleteModal && (
          <DeleteClientModal
            confirmDelete={this.confirmDelete}
            closeModals={this.closeModals}
          />
        )}
      </>
    );
  }
}

EditClient.propTypes = {
  client: PropTypes.object.isRequired,
  providers: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  deleteClient: PropTypes.func.isRequired,
  addNewProvider: PropTypes.func.isRequired,
  deleteProvider: PropTypes.func.isRequired,
  saveEditedProvider: PropTypes.func.isRequired,
};

export default EditClient;
