// specific dashboard access to role

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ role, children }) {
  const auth = useSelector(state => state.logged);

  if (!auth.loggedIn) {
    return <Navigate to="/login" />;
  }

  if (auth.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}
