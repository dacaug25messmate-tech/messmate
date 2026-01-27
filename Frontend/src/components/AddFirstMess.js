// // AddFirstMess.jsx
// import React from "react";
// import AddMessForm from "./AddMessForm";

// export default function AddFirstMess() {
//   const userId = localStorage.getItem("userid");

//   const handleSaved = () => {
//     // After first mess is added, redirect to dashboard
//     window.location.href = "/messowner-dashboard";
//   };

//   return (
//     <div className="container">
//       <h3>Welcome! Add Your First Mess</h3>
//       <AddMessForm userId={userId} mode="add" onSaved={handleSaved} />
//     </div>
//   );
// }
