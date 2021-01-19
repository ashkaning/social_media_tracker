import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
/* PAGES */
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ToastContainer />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route component={NoMatch} />
          </Switch>
        </div>

      </Router>
    );
  }
}
export default App;
