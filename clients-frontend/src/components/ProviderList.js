import React from "react";
import SingleProvider from "./SingleProvider";
import PropTypes from "prop-types";

function ProviderList({ providers, deleteProvider }) {
  const providersList = providers.map((el) => {
    return (
      <SingleProvider
        key={el._id}
        provider={el}
        deleteProvider={deleteProvider}
      />
    );
  });
  return <div>{providersList}</div>;
}

ProviderList.propTypes = {
  providers: PropTypes.array.isRequired,
  deleteProvider: PropTypes.func.isRequired,
};

export default ProviderList;
