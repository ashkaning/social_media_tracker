import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {EmployeeMenu} from './components/Menu';
/* PAGES */
import Home from "./pages/Home";
import AdminVideo from "./pages/AdminVideo";
import NoMatch from "./pages/NoMatch";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <EmployeeMenu />
          <ToastContainer />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/admin-video" component={AdminVideo} />
            <Route component={NoMatch} />
          </Switch>
        </div>

      </Router>
    );
  }
}
export default App;
