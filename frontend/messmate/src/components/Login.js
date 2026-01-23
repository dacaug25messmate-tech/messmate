import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../loggedSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";        
import "../styles/login.css";

export default function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:2025/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password })
      });

      //  Invalid login → toast instead of alert
      if (response.status === 401) {
        toast.error("Invalid username or password");
        setLoading(false);
        return;
      }

      // Other server errors
      if (!response.ok) {
        toast.error("Internal server error. Please try again later");
        setLoading(false);
        return;
      }

      const data = await response.json();

      // Extra check if backend returns invalid data
      if (!data || !data.uid || !data.role) {
        toast.error("Invalid login response from server");
        setLoading(false);
        return;
      }

      //  Save user info in localStorage
      localStorage.setItem("userid", data.uid);
      localStorage.setItem("username", data.uname);
      localStorage.setItem("role", data.role);

      // Update Redux state
      dispatch(login({
        loggedIn: true,
        userid: data.uid,
        username: data.uname,
        role: data.role
      }));

      toast.success("Login successfully");

      //  Redirect after 1.5s based on role
      setTimeout(() => {
        if (data.role === "ADMIN") navigate("/admin");
        else if (data.role === "CUSTOMER") navigate("/customer");
        else if (data.role === "MESSOWNER") navigate("/messowner");
        else navigate("/"); // fallback
      }, 1500);

    } catch (err) {
      toast.error("Network error. Please check server connection");
    } finally {
      setLoading(false);
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
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
