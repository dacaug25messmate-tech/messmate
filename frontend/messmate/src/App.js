import { Routes, Route } from "react-router-dom";
import AppHomeNavbar from "./components/AppHomeNavbar";
import AppHome from "./components/AppHome";
import Login from "./components/Login";
import Register from "./components/Register";

import AdminDashboard from "./components/dashboards/AdminDashboard";
import AdminViewUsers from "./components/admin/AdminViewUsers";
import AdminPendingUsers from "./components/admin/AdminPendingUsers"; // ✅ ADD THIS
import CustomerDashboard from "./components/dashboards/CustomerDashboard";
import MessOwnerDashboard from "./components/dashboards/MessOwnerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminViewFeedback from "./components/admin/AdminViewFeedback";

function App() {
  return (
    <>
      <AppHomeNavbar />

      <Routes>
        <Route path="/" element={<AppHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          {/* ✅ CHECK REGISTRATION REQUESTS */}
          <Route
            path="pendingusers"
            element={<AdminPendingUsers />}
          />

          {/* ✅ VIEW ALL USERS */}
          <Route
            path="viewusers"
            element={<AdminViewUsers />}
          />
          <Route 
            path="/admin/feedback" 
            element={<AdminViewFeedback />} />
        </Route>

        {/* CUSTOMER */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute role="CUSTOMER">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        {/* MESS OWNER */}
        <Route
          path="/messowner"
          element={
            <ProtectedRoute role="MESSOWNER">
              <MessOwnerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
