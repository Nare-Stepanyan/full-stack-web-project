import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

function SingleClient({ newClient }) {
  return (
    <tr>
      <td>{newClient.name}</td>
      <td>{newClient.email}</td>
      <td>{newClient.phone}</td>
      <td>{newClient.providers.join(", ")}</td>
      <td>
        <Button variant="link">Edit</Button>
      </td>
    </tr>
  );
}

SingleClient.propTypes = {
  newClient: PropTypes.object.isRequired,
};

export default SingleClient;
