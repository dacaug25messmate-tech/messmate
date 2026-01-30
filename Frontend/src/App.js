import { Routes, Route } from "react-router-dom";
import AppHomeNavbar from "./components/AppHomeNavbar";
import AppHome from "./components/AppHome";
import Login from "./components/Login";
import Register from "./components/Register";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import AdminDashboard from "./components/dashboards/AdminDashboard";
import AdminViewUsers from "./components/admin/AdminViewUsers";
import AdminPendingUsers from "./components/admin/AdminPendingUsers";
import AdminFoodItemRequests from "./components/admin/AdminFoodItemRequests";
import AdminMenuManagement from "./components/admin/AdminMenuManagement";

import CustomerDashboard from "./components/dashboards/CustomerDashboard";
import MessOwnerDashboard from "./components/dashboards/MessOwnerDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import ProfileAndMessInfo from "./components/messowner/ProfileAndMessInfo";
import MessOwnerFoodRequestForm from "./components/messowner/MessOwnerFoodRequestForm";
import ManageDailyMenu from "./components/messowner/ManageDailyMenu";
import ViewRegisteredCustomers from "./components/messowner/ViewRegisteredCustomers";
import AdminViewFeedback from "./components/admin/AdminViewFeedback";
import MessOwnerRatings from "./components/messowner/MessOwnerRatings";
import ManageOrders from "./components/messowner/ManageOrders";
import AdminDisableUser from "./components/admin/AdminDisableUser";

function App() {
  return (
    <>
      <AppHomeNavbar />

       {/* REQUIRED FOR TOASTS */}
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
          <Route path="orders" element={<ManageOrders />} />
          <Route index element={<ProfileAndMessInfo />} />
          <Route path="profile" element={<ProfileAndMessInfo />} />
          <Route path="customers" element={<ViewRegisteredCustomers/>}/>
         <Route path="dailymenu" element={<ManageDailyMenu/>}/>
          <Route path="request-item" element={<MessOwnerFoodRequestForm />} />
          <Route path="ratings" element={<MessOwnerRatings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
