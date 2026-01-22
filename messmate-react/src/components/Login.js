import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/loggedSlice";
import "../Login.css";

export default function Login() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username !== "" && password !== "") {
      dispatch(login("user"));
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h3 className="login-title">Login</h3>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
