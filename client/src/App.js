import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/register" component={Register} />
        <Route exact path="/resetpassword" component={ResetPassword} />
        <Route exact path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
