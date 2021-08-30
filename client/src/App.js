import React, { useContext } from "react";
import "./App.css";
import Login from "./components/auth/Login";
import Quora from "./components/Quora";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "./components/context/store";

function App() {
  const context = useContext(AuthContext);

  return (
    <div className="App">
      <Router>
        {!context.user && <Redirect to="/login" />}
        <Switch>
          {!context.user ? (
            <Route exact path="/login" component={Login} />
          ) : (
            <>
              <Route exact path="/" component={Quora} />
            </>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
