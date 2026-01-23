import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../loggedSlice";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
      alert("All fields are required");
      return;
    }

    try {
      //call to api
      const response = await fetch("http://localhost:2025/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password })
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();

      // LocalStorage
      localStorage.setItem("userid", data.uid);
      localStorage.setItem("username", data.uname);
      localStorage.setItem("role", data.role);

      // Redux
      dispatch(login({
        loggedIn: true,
        userid: data.uid,
        username: data.uname,
        role: data.role
      }));

      // Navigation
      console.log(data.role);
      if (data.role === "ADMIN") navigate("/admin");
      else if (data.role === "CUSTOMER") navigate("/customer");
      else if (data.role === "MESSOWNER") navigate("/messowner");

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h4>Login</h4>

        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            className="form-control"
            value={userName}
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100" >
          Login
        </button>
      </form>
    </div>
  );
}
