import { Routes, Route, Navigate } from "react-router-dom";
import AppHomeNavbar from "./components/AppHomeNavbar";
import AppHome from "./components/AppHome";
import Login from "./components/Login";
import Register from "./components/Register";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ADMIN */
import AdminDashboard from "./components/dashboards/AdminDashboard";
import AdminViewUsers from "./components/admin/AdminViewUsers";
import AdminPendingUsers from "./components/admin/AdminPendingUsers";
import AdminFoodItemRequests from "./components/admin/AdminFoodItemRequests";
import AdminMenuManagement from "./components/admin/AdminMenuManagement";
import AdminViewFeedback from "./components/admin/AdminViewFeedback";
import AdminDisableUser from "./components/admin/AdminDisableUser";

/* CUSTOMER */
import CustomerDashboard from "./components/dashboards/CustomerDashboard";

/* MESS OWNER */
import MessOwnerDashboard from "./components/dashboards/MessOwnerDashboard";
import ProfileAndMessInfo from "./components/messowner/ProfileAndMessInfo";
import MessOwnerFoodRequestForm from "./components/messowner/MessOwnerFoodRequestForm";
import ManageDailyMenu from "./components/messowner/ManageDailyMenu";
import ViewRegisteredCustomers from "./components/messowner/ViewRegisteredCustomers";
import MessOwnerRatings from "./components/messowner/messownerRatings";
import MonthlyPlans from "./components/messowner/MonthlyPlanList";
import ManageOrders from "./components/messowner/ManageOrders";

/* AUTH */
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <AppHomeNavbar />
      <ToastContainer position="top-right" autoClose={3000} />

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
          <Route path="menu" element={<AdminMenuManagement />} />
          <Route path="disable-user" element={<AdminDisableUser />} />
          <Route path="food-requests" element={<AdminFoodItemRequests />} />
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
          {/* Default page */}
          <Route index element={<ProfileAndMessInfo />} />

          <Route path="profile" element={<ProfileAndMessInfo />} />
          <Route path="orders" element={<ManageOrders />} />
          <Route path="dailymenu" element={<ManageDailyMenu />} />
          <Route path="monthlyplans" element={<MonthlyPlans />} />
          <Route path="customers" element={<ViewRegisteredCustomers />} />
          <Route path="request-item" element={<MessOwnerFoodRequestForm />} />
          <Route path="ratings" element={<MessOwnerRatings />} />

          {/* Fallback inside messowner */}
          <Route
            path="*"
            element={<div>Select an option from the sidebar</div>}
          />
        </Route>

        {/* GLOBAL FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
