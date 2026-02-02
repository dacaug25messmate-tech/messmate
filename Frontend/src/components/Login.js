import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../loggedSlice";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/login.css";
import { auth_url } from "./rest_endpoints";
import ForgotPassword from "./ForgotPassword";

export default function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false); // toggle forgot password

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(auth_url + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password })
      });

      const data = await response.json();

      if (response.status === 401) {
        toast.error("Invalid username or password");
        return;
      }

      if (response.status === 403) {
        if (data.status === "ACCESS_DENIED") toast.error("Access Denied");
        else if (data.status === "NOT_APPROVED") toast.warning("Wait until admin approval");
        else toast.error("You are not allowed to login");
        return;
      }

      if (!response.ok) {
        toast.error("Internal server error. Please try again later");
        return;
      }

      if (!data || !data.uid || !data.role) {
        toast.error("Invalid login response from server");
        return;
      }

      localStorage.setItem("userid", data.uid);
      localStorage.setItem("username", data.uname);
      localStorage.setItem("role", data.role);

      dispatch(
        login({
          loggedIn: true,
          userid: data.uid,
          username: data.uname,
          role: data.role
        })
      );

      toast.success("Login successfully");

      setTimeout(() => {
        const redirectPath = localStorage.getItem("redirectAfterLogin");
        const selectedPlan = localStorage.getItem("selectedPlan");

        if (redirectPath) {
          localStorage.removeItem("redirectAfterLogin");
          localStorage.removeItem("selectedPlan");
          navigate(redirectPath, { state: { plan: selectedPlan } });
        } else {
          if (data.role === "ADMIN") navigate("/admin");
          else if (data.role === "CUSTOMER") navigate("/customer");
          else if (data.role === "MESSOWNER") navigate("/messowner");
          else navigate("/");
        }
      }, 500);

    } catch (err) {
      toast.error("Network error. Please check server connection");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {!showForgotPassword ? (
        <form className="auth-form" onSubmit={handleSubmit}>
          <h4 className="text-center mb-3">Login</h4>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              className="form-control"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <div className="text-center mt-2">
            <span
              className="text-primary fw-semibold cursor-pointer"
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot Password?
            </span>
          </div>

          <div className="text-center mt-3">
            <span className="text-muted">Don’t have an account? </span>
            <Link to="/register" className="fw-semibold text-primary">
              Register
            </Link>
          </div>
        </form>
      ) : (
        // Show Forgot Password Component
        <ForgotPassword onBackToLogin={() => setShowForgotPassword(false)} />
      )}

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
