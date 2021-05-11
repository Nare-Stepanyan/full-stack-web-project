import React from "react";
import SingleProvider from "./SingleProvider";
import PropTypes from "prop-types";

function ProviderList({ providers }) {
  const providersList = providers.map((el) => {
    return <SingleProvider key={el._id} provider={el.name} />;
  });
  return <div>{providersList}</div>;
}

ProviderList.propTypes = {
  providers: PropTypes.array.isRequired,
};

export default ProviderList;
