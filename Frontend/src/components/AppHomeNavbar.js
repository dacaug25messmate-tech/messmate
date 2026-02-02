import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../loggedSlice";
import "../styles/navbar.css";

export default function AppNavbar() {
  const auth = useSelector(state => state.logged);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg app-navbar shadow-sm">
      <div className="container-fluid">

        {/* BRAND */}
        <Link className="navbar-brand fw-bold" to="/">
          MessMate
        </Link>

        {/* TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV LINKS */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {!auth.loggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link "
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}

            {auth.loggedIn && auth.role === "Admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Admin Dashboard
                </Link>
              </li>
            )}

            {auth.loggedIn && auth.role === "Customer" && (
              <li className="nav-item">
                <Link className="nav-link" to="/customer">
                  My Dashboard
                </Link>
              </li>
            )}

            {auth.loggedIn && auth.role === "MessOwner" && (
              <li className="nav-item">
                <Link className="nav-link" to="/messowner">
                  Mess Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* USER INFO */}
          {auth.loggedIn && (
            <div className="d-flex align-items-center gap-3">
              <span className="text-white small fw-semibold">
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
      </div>
    </nav>
  );
}
