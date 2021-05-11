import React, { PureComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Form, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import ConfirmProviderModal from "./ConfirmProviderModal";
import EditProviderModal from "./EditProviderModal";

class SingleProvider extends PureComponent {
  state = {
    showConfirm: false,
    showEdit: false,
  };
  openConfirmModal = () => {
    this.setState({
      showConfirm: !this.state.showConfirm,
    });
  };
  openEditModal = () => {
    this.setState({
      showEdit: !this.state.showEdit,
    });
  };

  render() {
    const { provider, deleteProvider } = this.props;
    const { showConfirm, showEdit } = this.state;
    return (
      <div className="providerList">
        <Col sm={6}>
          <Form.Check type="checkbox" label={provider.name} />
        </Col>
        <Col sm={1}>
          <Button variant="custom" onClick={this.openEditModal}>
            <FontAwesomeIcon icon={faEdit} style={{ color: "#17a2b8" }} />
          </Button>
        </Col>
        <Col sm={1}>
          <Button variant="custom" onClick={this.openConfirmModal}>
            <FontAwesomeIcon icon={faTrash} style={{ color: "#d11a2a" }} />
          </Button>
        </Col>
        {showConfirm && (
          <ConfirmProviderModal
            handleClose={this.openConfirmModal}
            deleteProvider={deleteProvider}
            id={provider._id}
          />
        )}
        {showEdit && (
          <EditProviderModal
            handleClose={this.openEditModal}
            provider={provider}
          />
        )}
      </div>
    );
  }
}

SingleProvider.propTypes = {
  provider: PropTypes.object.isRequired,
  deleteProvider: PropTypes.func.isRequired,
};

export default SingleProvider;
