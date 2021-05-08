import React, { PureComponent } from "react";
import { Table, Button } from "react-bootstrap";
import AddNewClient from "./AddNewClient";
import SingleClient from "./SingleClient";
import EditClient from "./EditClient";

class ClientsList extends PureComponent {
  state = {
    name: "",
    email: "",
    phone: "",
    clients: [],
    providers: [
      "Provider 1",
      "Provider 2",
      "Provider 3",
      "Provider 4",
      "Provider 5",
    ],
    newClientModal: false,
    editClientModal: false,
    editClient: null,
  };

  toggleAddNewClientModal = () => {
    this.setState({
      newClientModal: !this.state.newClientModal,
    });
  };
  toggleEditClientModal = () => {
    this.setState({
      editClientModal: !this.state.editClientModal,
    });
  };
  render() {
    const { clients } = this.state;
    const clientList = clients.map((el, i) => {
      return <SingleClient key={i} newClient={el} />;
    });
    return (
      <>
        <div className="table-wrapper">
          <div className="client-list">
            <h3>Clients</h3>
            <Button variant="info" onClick={this.toggleAddNewClientModal}>
              New Client
            </Button>
          </div>
          <Table bordered hover responsive="sm" variant="light">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Providers</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{clientList}</tbody>
          </Table>
        </div>
        {this.state.newClientModal && (
          <AddNewClient providers={this.state.providers} />
        )}
        {this.state.editClientModal && (
          <EditClient providers={this.state.providers} />
        )}
      </>
    );
  }
}

export default ClientsList;
