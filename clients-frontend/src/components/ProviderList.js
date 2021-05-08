import React from "react";
import SingleProvider from "./SingleProvider";

function ProviderList({ providers }) {
  const providersList = providers.map((el) => {
    return <SingleProvider key={el._id} provider={el} />;
  });
  return <div>{providersList}</div>;
}

export default ProviderList;
