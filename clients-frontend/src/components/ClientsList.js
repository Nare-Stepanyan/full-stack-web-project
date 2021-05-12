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
    providers: [],
    newClientModal: false,
    editClientModal: false,
    editClient: null,
  };

  componentDidMount() {
    const url = "http://localhost:3001/provider";
    fetch(url)
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        this.setState({
          providers: response,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
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

  addProvider = (name) => {
    const { providers } = this.state;
    const found = providers.some((el) => el.name === name);
    if (!found) {
      const url = "http://localhost:3001/provider";
      const body = JSON.stringify({ name });
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.error) {
            throw response.error;
          }
          const newProvider = response;
          this.setState({
            providers: [...this.state.providers, newProvider],
          });
        })
        .catch((error) => {});
    }
  };

  saveEditedProvider = (editedProvider) => {
    console.log(editedProvider);
    const url = `http://localhost:3001/provider/${editedProvider._id}`;
    const body = JSON.stringify(editedProvider);
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          throw response.error;
        } else {
          const newProviders = [...this.state.providers];
          const editedProviderIndex = this.state.providers.findIndex(
            (provider, i) => provider._id === editedProvider._id
          );
          newProviders[editedProviderIndex] = response;
          this.setState({
            providers: newProviders,
          });
        }
      })
      .catch((error) => {});
  };

  deleteProvider = (id) => {
    const url = `http://localhost:3001/provider/${id}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        const newProviders = this.state.providers.filter(
          (provider) => provider._id !== id
        );
        this.setState({
          providers: newProviders,
        });
      })
      .catch((error) => {});
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
          <AddNewClient
            providers={this.state.providers}
            onClose={this.toggleAddNewClientModal}
            addNewProvider={this.addProvider}
            deleteProvider={this.deleteProvider}
            saveEditedProvider={this.saveEditedProvider}
          />
        )}
        {this.state.editClientModal && (
          <EditClient
            providers={this.state.providers}
            onClose={this.toggleAddNewClientModal}
          />
        )}
      </>
    );
  }
}

export default ClientsList;
