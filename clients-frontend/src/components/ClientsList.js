import React, { PureComponent } from "react";
import { Table, Button } from "react-bootstrap";
import Loader from "./Loader";
import AddNewClient from "./AddNewClient";
import SingleClient from "./SingleClient";
import EditClient from "./EditClient";
import { checkData } from "./../helpers/utils";

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
    spinner: true,
    errors: null,
  };

  componentDidMount() {
    this.getProviders();
    this.getClients();
  }
  getProviders = () => {
    const url = "http://localhost:3001/provider";
    fetch(url)
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        this.setState({
          providers: response,
          spinner: false,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  getClients = () => {
    const urlClients = "http://localhost:3001/client";
    fetch(urlClients)
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        this.setState({
          clients: response,
          spinner: false,
        });
      })
      .catch((error) => {
        console.log("Error:");
      });
  };
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

  makeSpinnerWork = () => {
    this.setState({
      spinner: true,
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
    const { name, email, phone, selectedProviders, clients } = this.state;
    let providers = [...selectedProviders];
    let errors = checkData(name, email, phone, clients);
    if (Object.values(errors).length > 0) {
      return this.setState({
        errors,
      });
    } else {
      this.makeSpinnerWork();
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
            errors: null,
          });
        })
        .then(() => this.getClients())
        .catch((error) => {});
    }
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

  saveEditedClient = (editedClient) => {
    this.makeSpinnerWork();
    const url = `http://localhost:3001/client/${editedClient._id}`;
    const body = JSON.stringify(editedClient);
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
          const newClients = [...this.state.clients];
          const editedClientIndex = this.state.clients.findIndex(
            (client) => client._id === editedClient._id
          );
          newClients[editedClientIndex] = response;
          this.setState({
            clients: newClients,
            errors: null,
          });
        }
      })
      .then(() => {
        this.getClients();
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
    this.getClients();
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
    const { clients, spinner } = this.state;
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
            {spinner ? (
              <tbody className="loader">
                <tr>
                  <td>
                    <Loader />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>{clientList}</tbody>
            )}
          </Table>
        </div>

        {this.state.newClientModal && (
          <AddNewClient
            providers={this.state.providers}
            selectedProviders={this.state.selectedProviders}
            onClose={this.toggleAddNewClientModal}
            addNewProvider={this.addProvider}
            deleteProvider={this.deleteProvider}
            saveEditedProvider={this.saveEditedProvider}
            handleNewClientInfo={this.handleClick}
            handleChangeNewClientInfo={this.handleChange}
            onCheck={this.handleCheck}
            errors={this.state.errors}
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
            saveEditedClient={this.saveEditedClient}
            onCheck={this.handleCheck}
            clients={this.state.clients}
          />
        )}
      </>
    );
  }
}

export default ClientsList;
