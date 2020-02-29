import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./auth/Login";

import MyState from "../context/table/MyState";
import AuthState from "../context/auth/AuthState";
import AlertState from "../context/alert/AlertState";

import PrivateRoute from "./routing/PrivateRoute";

const App = () => {
  return (
    <AuthState>
      <MyState>
        <AlertState>
          <Router basename={process.env.REACT_APP_ROUTER_BASE || ""}>
            <Fragment>
              <Switch>
                <PrivateRoute exact path="/" component={Home} />

                <Route exact path="/login" component={Login} />
              </Switch>
            </Fragment>
          </Router>
        </AlertState>
      </MyState>
    </AuthState>
  );
};

export default App;
