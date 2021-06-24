import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import BoxForm from "./components/BoxForm/BoxForm";
import Boxes from "./components/Boxes/Boxes";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <h1>Boxes App</h1>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/addbox">Add New Box</Link>
            </li>
            <li>
              <Link to="/listboxes">List Box</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <BoxForm />
          </Route>
          <Route path="/addbox">
            <BoxForm />
          </Route>
          <Route path="/listboxes">
            <Boxes />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
