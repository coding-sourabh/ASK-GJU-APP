import React, { useContext, useState } from "react";
import "./Login.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/store";

function Login() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(AuthContext);

  const handleSignIn = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8800/api/user/login", {
        username: username,
        password: password,
      })
      .then(function (response) {
        console.log("successfully logged in", response.data);
        context.login(response.data);
        history.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const registerSignIn = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8800/api/user/register", {
        username: username,
        email: email,
        password: password,
        photo: null,
      })
      .then(function (response) {
        console.log("successfully logged in", response.data);
        context.login(response.data);
        history.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__logo">
          <h1 className="glow">Ask GJU</h1>
        </div>
        <div className="login__desc">
          <p>GJU is one big family and we need to help each other</p>
          <h3>Built by Sourabh</h3>
        </div>
        <div className="login__auth">
          <div className="login__emailPass">
            <div className="login__label">
              <h4 style={{ fontSize: "25px", fontWeight: "600" }}>Login</h4>
            </div>
            <div className="login__inputFields">
              <div className="login__inputField">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="username"
                />
              </div>
              <div className="login__inputField">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="email"
                />
              </div>

              <div className="login__inputField">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="password"
                />
              </div>
            </div>
            <div className="login__forgButt">
              <button onClick={handleSignIn} style={{ margin: "auto" }}>
                Login
              </button>
            </div>

            <div className="registerLink">
              <small
                style={{ fontSize: "15px", color: "grey", marginRight: "5px" }}
              >
                Don't have an account?
              </small>

              <button className="registerButton" onClick={registerSignIn}>
                Register
              </button>
            </div>
          </div>
        </div>
        <div className="login__lang">
          <p>हिन्दी</p>
          <ArrowForwardIosIcon fontSize="small" />
        </div>
        <div className="login__footer">
          <p>About</p>
          <p>Languages</p>
          <p>Careers</p>
          <p>Admissions</p>
          <p>Privacy</p>
          <p>Terms</p>
          <p>Contact</p>
          <p>&copy; Gju Fake Inc. 2021</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
