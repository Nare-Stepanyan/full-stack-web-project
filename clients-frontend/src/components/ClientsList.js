import React, { PureComponent } from "react";
import { Table, Button } from "react-bootstrap";
import SingleClient from "./SingleClient";
//import AddNewClient from "./AddNewClient";

class ClientsList extends PureComponent {
  state = {
    clients: [
      {
        name: "Test",
        email: "test@krfs.com",
        phone: 3055550000,
        providers: ["Provider 1", "Provider2"],
      },
    ],
    name: "",
    email: "",
    phone: "",
    providers: [],
    showNewClientModal: false,
  };

  handleClick = () => {
    this.setState({
      showNewClientModal: !this.state.showNewClientModal,
    });
  };
  render() {
    const { clients } = this.state;
    const clientList = clients.map((el, i) => {
      return <SingleClient key={i} newClient={el} />;
    });
    return (
      <div className="table-wrapper">
        <div className="client-list">
          <h3>Clients</h3>
          <Button variant="info" onClick={this.handleClick}>
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
    );
  }
}

export default ClientsList;
