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
import SearchMess from "./components/customer/SearchMess";
import MessDetails from "./components/customer/MessDetails";
import CustomerProfile from "./components/customer/CustomerProfile";
import MySubscriptions from "./components/customer/MySubscriptions";

/* MESS OWNER */
import MessOwnerDashboard from "./components/dashboards/MessOwnerDashboard";
import ProfileAndMessInfo from "./components/messowner/ProfileAndMessInfo";
import MessOwnerFoodRequestForm from "./components/messowner/MessOwnerFoodRequestForm";
import ManageDailyMenu from "./components/messowner/ManageDailyMenu";
import ViewRegisteredCustomers from "./components/messowner/ViewRegisteredCustomers";
import MessOwnerRatings from "./components/messowner/MessOwnerRatings";
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
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<AppHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PUBLIC CUSTOMER ROUTES */}
        <Route path="/search-mess" element={<SearchMess />} />
        <Route path="/mess/:id" element={<MessDetails />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="pendingusers" />} />
          <Route path="pendingusers" element={<AdminPendingUsers />} />
          <Route path="viewusers" element={<AdminViewUsers />} />
          <Route path="menu" element={<AdminMenuManagement />} />
          <Route path="food-requests" element={<AdminFoodItemRequests />} />
          <Route path="feedback" element={<AdminViewFeedback />} />
          <Route path="disable-user" element={<AdminDisableUser />} />
        </Route>

        {/* CUSTOMER DASHBOARD */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute role="CUSTOMER">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<SearchMess />} />
          <Route path="profile" element={<CustomerProfile />} />
          <Route path="search-mess" element={<SearchMess />} />
          <Route path="mess/:id" element={<MessDetails />} />
          <Route path="my-subscriptions" element={<MySubscriptions />} />
        </Route>

        {/* MESS OWNER DASHBOARD */}
        <Route
          path="/messowner"
          element={
            <ProtectedRoute role="MESSOWNER">
              <MessOwnerDashboard />
            </ProtectedRoute>
          }
        >
          {/* DEFAULT PAGE (NO PROFILE AUTO LOAD) */}
          <Route
  // index
  // element={
  //   <div className="container mt-5">
  //     <div className="row justify-content-center">
  //       <div className="col-md-8">
  //         <div className="card shadow-sm border-0">
  //           <div className="card-body text-center p-5">
  //             {/* <h2 className="fw-bold text-primary mb-3">
  //               Welcome to Mess Owner Panel
  //             </h2>

  //             <p className="text-muted fs-5 mb-4">
  //               Manage your mess profile, menus, plans, orders, and customers
  //               from one place.
  //             </p>

  //             <div className="alert alert-info mb-0">
  //               👉 Select an option from the sidebar to get started
  //             </div> */}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // }
/>


          {/* SIDEBAR ROUTES */}
          <Route path="profile" element={<ProfileAndMessInfo />} />
          <Route path="orders" element={<ManageOrders />} />
          <Route path="dailymenu" element={<ManageDailyMenu />} />
          <Route path="monthlyplans" element={<MonthlyPlans />} />
          <Route path="customers" element={<ViewRegisteredCustomers />} />
          <Route path="request-item" element={<MessOwnerFoodRequestForm />} />
          <Route path="ratings" element={<MessOwnerRatings />} />
        </Route>

        {/* GLOBAL FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
// import { Routes, Route, Navigate } from "react-router-dom";
// import AppHomeNavbar from "./components/AppHomeNavbar";
// import AppHome from "./components/AppHome";
// import Login from "./components/Login";
// import Register from "./components/Register";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// /* ADMIN */
// import AdminDashboard from "./components/dashboards/AdminDashboard";
// import AdminViewUsers from "./components/admin/AdminViewUsers";
// import AdminPendingUsers from "./components/admin/AdminPendingUsers";
// import AdminFoodItemRequests from "./components/admin/AdminFoodItemRequests";
// import AdminMenuManagement from "./components/admin/AdminMenuManagement";
// import AdminViewFeedback from "./components/admin/AdminViewFeedback";
// import AdminDisableUser from "./components/admin/AdminDisableUser";

// /* CUSTOMER */
// import CustomerDashboard from "./components/dashboards/CustomerDashboard";
// import SearchMess from "./components/customer/SearchMess";
// import MessDetails from "./components/customer/MessDetails";
// import CustomerProfile from "./components/customer/CustomerProfile";
// import MySubscriptions from "./components/customer/MySubscriptions";

// /* MESS OWNER */
// import MessOwnerDashboard from "./components/dashboards/MessOwnerDashboard";
// import ProfileAndMessInfo from "./components/messowner/ProfileAndMessInfo";
// import MessOwnerFoodRequestForm from "./components/messowner/MessOwnerFoodRequestForm";
// import ManageDailyMenu from "./components/messowner/ManageDailyMenu";
// import ViewRegisteredCustomers from "./components/messowner/ViewRegisteredCustomers";
// import MessOwnerRatings from "./components/messowner/MessOwnerRatings";
// import MonthlyPlans from "./components/messowner/MonthlyPlanList";
// import ManageOrders from "./components/messowner/ManageOrders";

// /* AUTH */
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <>
//       <AppHomeNavbar />
//       <ToastContainer position="top-right" autoClose={3000} />

//       <Routes>
//         {/* PUBLIC ROUTES */}
//         <Route path="/" element={<AppHome />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* PUBLIC CUSTOMER ROUTES */}
//         <Route path="/search-mess" element={<SearchMess />} />
//         <Route path="/mess/:id" element={<MessDetails />} />

//         {/* ADMIN ROUTES */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute role="ADMIN">
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="pendingusers" element={<AdminPendingUsers />} />
//           <Route path="viewusers" element={<AdminViewUsers />} />
//           <Route path="menu" element={<AdminMenuManagement />} />
//           <Route path="food-requests" element={<AdminFoodItemRequests />} />
//           <Route path="feedback" element={<AdminViewFeedback />} />
//           <Route path="disable-user" element={<AdminDisableUser />} />
//         </Route>

//         {/* CUSTOMER DASHBOARD */}
//         <Route
//           path="/customer"
//           element={
//             <ProtectedRoute role="CUSTOMER">
//               <CustomerDashboard />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<SearchMess />} />
//           <Route path="profile" element={<CustomerProfile />} />
//           <Route path="search-mess" element={<SearchMess />} />
//           <Route path="mess/:id" element={<MessDetails />} />
//           <Route path="my-subscriptions" element={<MySubscriptions />} />
//         </Route>

//         {/* MESS OWNER ROUTES */}
//         <Route
//           path="/messowner"
//           element={
//             <ProtectedRoute role="MESSOWNER">
//               <MessOwnerDashboard />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<ProfileAndMessInfo />} />
//           <Route path="profile" element={<ProfileAndMessInfo />} />
//           <Route path="orders" element={<ManageOrders />} />
//           <Route path="dailymenu" element={<ManageDailyMenu />} />
//           <Route path="monthlyplans" element={<MonthlyPlans />} />
//           <Route path="customers" element={<ViewRegisteredCustomers />} />
//           <Route path="request-item" element={<MessOwnerFoodRequestForm />} />
//           <Route path="ratings" element={<MessOwnerRatings />} />

//           <Route
//             path="*"
//             element={<div>Select an option from the sidebar</div>}
//           />
//         </Route>

//         {/* GLOBAL FALLBACK */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </>
//   );
// }

// export default App;