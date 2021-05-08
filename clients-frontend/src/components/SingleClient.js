import React from "react";
import { Button } from "react-bootstrap";

function SingleClient({ id, newClient }) {
  return (
    <tr key={id}>
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

export default SingleClient;
