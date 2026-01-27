import { Routes, Route } from "react-router-dom";
import AppHomeNavbar from "./components/AppHomeNavbar";
import AppHome from "./components/AppHome";
import Login from "./components/Login";
import Register from "./components/Register";

import AdminDashboard from "./components/dashboards/AdminDashboard";
import AdminViewUsers from "./components/admin/AdminViewUsers";
import AdminPendingUsers from "./components/admin/AdminPendingUsers"; 
import CustomerDashboard from "./components/dashboards/CustomerDashboard";
import MessOwnerDashboard from "./components/dashboards/MessOwnerDashboard";
import MessOwnerRatings from "./components/messowner/messownerRatings"; 

import ProtectedRoute from "./components/ProtectedRoute";
import AdminMenuManagement from "./components/admin/AdminMenuManagement";
import ManageDailyMenu from "./components/messowner/ManageDailyMenu";

function App() {
  return (
    <>
      <AppHomeNavbar />

      <Routes>
        {/* PUBLIC */}
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

          {/*manage menu structure*/}
          <Route
            path="menu"
            element={<AdminMenuManagement />}
          />
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

          <Route
            path="dailymenu" 
            element={<ManageDailyMenu />} 
          />
          
        </Route>
      </Routes>
    </>
  );
}

export default App;
