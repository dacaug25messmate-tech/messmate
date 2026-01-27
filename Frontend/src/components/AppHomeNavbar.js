import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../loggedSlice";
import "../styles/navbar.css";

export default function AppNavbar() {
  const auth = useSelector(state => state.logged);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">MessMate</Link>

        <ul className="navbar-nav me-auto">

          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>

          {!auth.loggedIn && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          )}

          {auth.loggedIn && auth.role === "Admin" && (
            <li className="nav-item">
              <Link className="nav-link" to="/admin">Admin Dashboard</Link>
            </li>
          )}

          {auth.loggedIn && auth.role === "Customer" && (
            <li className="nav-item">
              <Link className="nav-link" to="/customer">My Dashboard</Link>
            </li>
          )}

          {auth.loggedIn && auth.role === "MessOwner" && (
            <li className="nav-item">
              <Link className="nav-link" to="/messowner">Mess Dashboard</Link>
            </li>
          )}
        </ul>

        {auth.loggedIn && (
          <div className="d-flex align-items-center">
            <span className="me-3">
              {auth.username} ({auth.role})
            </span>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
