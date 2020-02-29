import React from "react";
import Home from "./pages/Home";
import MyState from "../context/table/MyState";
import AuthState from "../context/auth/AuthState";
import AlertState from "../context/alert/AlertState";

const App = () => {
  return (
    <AuthState>
      <MyState>
        <AlertState>
          <Home />
        </AlertState>
      </MyState>
    </AuthState>
  );
};

export default App;
