import { Routes, Route } from "react-router-dom";
import AppHomeNavbar from "./components/AppHomeNavbar";
import AppHome from "./components/AppHome";
import Login from "./components/Login";
import Register from "./components/Register";

import AdminDashboard from "./components/dashboards/AdminDashboard";
import AdminViewUsers from "./components/admin/AdminViewUsers";
import AdminPendingUsers from "./components/admin/AdminPendingUsers";
import AdminViewFeedback from "./components/admin/AdminViewFeedback";

import CustomerDashboard from "./components/dashboards/CustomerDashboard";
import MessOwnerDashboard from "./components/dashboards/MessOwnerDashboard";
import MessOwnerRatings from "./components/messowner/messownerRatings"; 

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <AppHomeNavbar />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<AppHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="pendingusers" element={<AdminPendingUsers />} />
          <Route path="viewusers" element={<AdminViewUsers />} />
          <Route path="feedback" element={<AdminViewFeedback />} />
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
        >
        

          {/* VIEW RATINGS */}
          
          <Route path="ratings" element={<MessOwnerRatings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
