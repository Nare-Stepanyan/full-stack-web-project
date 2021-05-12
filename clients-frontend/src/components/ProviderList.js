import React from "react";
import SingleProvider from "./SingleProvider";
import PropTypes from "prop-types";

function ProviderList({
  providers,
  deleteProvider,
  saveEditedProvider,
  onCheck,
}) {
  const providersList = providers.map((el) => {
    return (
      <SingleProvider
        key={el._id}
        provider={el}
        deleteProvider={deleteProvider}
        saveEditedProvider={saveEditedProvider}
        onCheck={onCheck}
      />
    );
  });
  return <div>{providersList}</div>;
}

ProviderList.propTypes = {
  providers: PropTypes.array.isRequired,
  deleteProvider: PropTypes.func.isRequired,
  saveEditedProvider: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
};

export default ProviderList;
