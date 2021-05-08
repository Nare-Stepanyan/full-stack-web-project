import "./App.css";
import ClientsList from "./components/ClientsList";
//import { Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="wrapper">
      <ClientsList />
      {/* <Switch>
        <Route path="/" exact component={Clients} />
        <Route path="/404" exact component={NotFound} />
        <Redirect to="/404" />
      </Switch> */}
    </div>
  );
}

export default App;
