import { Routes, Route } from "react-router-dom";
import AppHomeNavbar from "./components/AppHomeNavbar";
import AppHome from "./components/AppHome";
import Login from "./components/Login";
import Register from "./components/Register";

import AdminDashboard from "./components/dashboards/AdminDashboard";
import AdminViewUsers from "./components/admin/AdminViewUsers";
import AdminFoodItemRequests from "./components/admin/AdminFoodItemRequests";

import CustomerDashboard from "./components/dashboards/CustomerDashboard";
import MessOwnerDashboard from "./components/dashboards/MessOwnerDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import MessOwnerFoodRequestForm from "./components/messowner/MessOwnerFoodRequestForm";

// ✅ ADD THIS IMPORT
import ProfileAndMessInfo from "./components/messowner/ProfileAndMessInfo";

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
          <Route path="viewusers" element={<AdminViewUsers />} />
          <Route path="menu-requests" element={<AdminFoodItemRequests />} />
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
          {/* ✅ DEFAULT PAGE */}
          <Route index element={<ProfileAndMessInfo />} />

          {/* ✅ PROFILE & MESS INFO */}
          <Route path="profile" element={<ProfileAndMessInfo />} />

          {/* ✅ REQUEST NEW FOOD ITEM */}
          <Route path="request-item" element={<MessOwnerFoodRequestForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
