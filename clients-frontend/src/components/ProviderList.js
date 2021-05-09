import React from "react";
import SingleProvider from "./SingleProvider";

function ProviderList({ providers }) {
  console.log("providerList component", providers);
  const providersList = providers.map((el) => {
    return <SingleProvider key={el._id} provider={el.name} />;
  });
  return <div>{providersList}</div>;
}

export default ProviderList;
