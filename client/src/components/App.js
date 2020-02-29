import React from "react";
import Home from "./pages/Home";
import MyState from "../context/table/MyState";
import DailyState from "../context/daily/DailyState";
import AuthState from "../context/auth/AuthState";
import AlertState from "../context/alert/AlertState";

const App = () => {
  return (
    <AuthState>
      <MyState>
        <DailyState>
          <AlertState>
            <Home />
          </AlertState>
        </DailyState>
      </MyState>
    </AuthState>
  );
};

export default App;
