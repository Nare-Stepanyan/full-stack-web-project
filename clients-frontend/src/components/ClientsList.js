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
    selectedProviders: new Set(),
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

    const urlClients = "http://localhost:3001/client";
    fetch(urlClients)
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        this.setState({
          clients: response,
        });
      })
      .catch((error) => {
        console.log("Error:");
      });
  }
  toggleAddNewClientModal = () => {
    this.setState({
      newClientModal: !this.state.newClientModal,
    });
  };
  toggleEditClientModal = (client) => {
    this.setState({
      editClient: client,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handleCheck = (id) => {
    const selectedProviders = new Set(this.state.selectedProviders);
    if (selectedProviders.has(id)) {
      selectedProviders.delete(id);
    } else {
      selectedProviders.add(id);
    }
    this.setState({
      selectedProviders,
    });
  };
  handleClick = () => {
    const { name, email, phone, selectedProviders } = this.state;
    let providers = [...selectedProviders];
    if (!name || !email || !phone) {
      return;
    }

    const client = {
      name,
      email,
      phone,
      providers,
    };
    const url = "http://localhost:3001/client";

    const body = JSON.stringify(client);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        const newClient = response;
        this.setState({
          clients: [newClient, ...this.state.clients],
          newClientModal: false,
          name: "",
          email: "",
          phone: "",
          selectedProviders: new Set(),
        });
      })
      .catch((error) => {});
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
            (provider) => provider._id === editedProvider._id
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
  deleteClient = (id) => {
    const url = `http://localhost:3001/client/${id}`;
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
        const newClientList = this.state.clients.filter(
          (client) => client._id !== id
        );
        this.setState({
          clients: newClientList,
        });
      })
      .catch((error) => {});
  };

  render() {
    const { clients } = this.state;
    const clientList = clients.map((el) => {
      return (
        <SingleClient
          key={el._id}
          id={el._id}
          newClient={el}
          showEditModal={this.toggleEditClientModal}
        />
      );
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
            handleNewClientInfo={this.handleClick}
            handleChangeNewClientInfo={this.handleChange}
            onCheck={this.handleCheck}
          />
        )}
        {!!this.state.editClient && (
          <EditClient
            client={this.state.editClient}
            providers={this.state.providers}
            onClose={() => this.toggleEditClientModal(null)}
            deleteClient={this.deleteClient}
            addNewProvider={this.addProvider}
            deleteProvider={this.deleteProvider}
            saveEditedProvider={this.saveEditedProvider}
            onCheck={this.handleCheck}
          />
        )}
      </>
    );
  }
}

export default ClientsList;
