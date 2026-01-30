// import { useEffect, useState } from "react";
// import AddMonthlyPlanModal from "./AddMonthlyPlanModal";
// import "../../styles/monthlyPlans.css";

// export default function MonthlyPlans() {
//   const userId = localStorage.getItem("userid");

//   const [messes, setMesses] = useState([]);
//   const [selectedMess, setSelectedMess] = useState(null);
//   const [plans, setPlans] = useState([]);
//   const [showModal, setShowModal] = useState({ visible: false, plan: null });

//   useEffect(() => {
//     loadMesses();
//   }, []);

//   // 🔹 Load all messes of owner
//   const loadMesses = async () => {
//     try {
//       const res = await fetch(
//         `http://localhost:2025/api/messowner/messes/${userId}`
//       );
//       const data = await res.json();

//       if (!data || data.length === 0) return;

//       setMesses(data);
//       setSelectedMess(data[0]); // default first mess
//       loadPlans(data[0].messId);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // 🔹 Load plans for selected mess
//   const loadPlans = async (messId) => {
//     try {
//       const res = await fetch(
//         `http://localhost:2025/api/monthly-plans/mess/${messId}`
//       );
//       const data = await res.json();
//       setPlans(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // 🔹 Delete plan
//   const deletePlan = async (planId) => {
//     if (!window.confirm("Delete this plan?")) return;

//     try {
//       await fetch(
//         `http://localhost:2025/api/monthly-plans/delete/${planId}`,
//         { method: "DELETE" }
//       );
//       loadPlans(selectedMess.messId);
//     } catch (err) {
//       console.error(err);
//       alert("Error deleting plan");
//     }
//   };

//   if (!selectedMess) return <p>No mess found</p>;

//   return (
//     <div className="monthly-plans-container">

//       {/* 🔷 Mess Selector */}
//       <div className="mess-selector">
//         <label>Select Mess: </label>
//         <select
//           value={selectedMess.messId}
//           onChange={(e) => {
//             const mess = messes.find(
//               (m) => m.messId === parseInt(e.target.value)
//             );
//             setSelectedMess(mess);
//             loadPlans(mess.messId);
//           }}
//         >
//           {messes.map((m) => (
//             <option key={m.messId} value={m.messId}>
//               {m.messName}
//             </option>
//           ))}
//         </select>
//       </div>

//       <h2 className="mess-name">{selectedMess.messName}</h2>

//       <div className="monthly-plans-header">
//         <h3>Monthly Plans</h3>
//         <button
//           className="add-plan-btn"
//           onClick={() => setShowModal({ visible: true, plan: null })}
//         >
//           + Add Plan
//         </button>
//       </div>

//       <table className="plans-table">
//         <thead>
//           <tr>
//             <th>Plan Name</th>
//             <th>Price</th>
//             <th>Meals</th>
//             <th>Validity</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {plans.length === 0 ? (
//             <tr>
//               <td colSpan="5" className="no-data">
//                 No plans added yet
//               </td>
//             </tr>
//           ) : (
//             plans.map((plan) => (
//               <tr key={plan.planId}>
//                 <td>{plan.planName}</td>
//                 <td>{plan.monthlyPrice}</td>
//                 <td>{plan.mealInclusion}</td>
//                 <td>{plan.validityPeriod}</td>
//                 <td>
//                   <button
//                     onClick={() =>
//                       setShowModal({ visible: true, plan })
//                     }
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="delete-btn"
//                     onClick={() => deletePlan(plan.planId)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* 🔹 Modal */}
//       {showModal.visible && (
//         <AddMonthlyPlanModal
//           mess={selectedMess}
//           plan={showModal.plan}
//           onClose={() => setShowModal({ visible: false, plan: null })}
//           onSaved={() => {
//             setShowModal({ visible: false, plan: null });
//             loadPlans(selectedMess.messId);
//           }}
//         />
//       )}
//     </div>
//   );}
// import { useEffect, useState } from "react";
// import AddMonthlyPlanModal from "./AddMonthlyPlanModal";
// import "../../styles/monthlyPlans.css";

// export default function MonthlyPlans() {
//   const userId = localStorage.getItem("userid");

//   const [messes, setMesses] = useState([]);
//   const [selectedMess, setSelectedMess] = useState(null);
//   const [plans, setPlans] = useState([]);
//   const [showModal, setShowModal] = useState({ visible: false, plan: null });

//   // 🔹 Load all messes on page load
//   useEffect(() => {
//     fetchMesses();
//   }, []);

//   const fetchMesses = async () => {
//     try {
//       const res = await fetch(
//         `http://localhost:2025/api/messowner/messes/${userId}`
//       );
//       const data = await res.json();

//       if (!data || data.length === 0) {
//         alert("No mess found for this owner");
//         return;
//       }

//       setMesses(data);
//       setSelectedMess(data[0]); // default first mess
//       fetchPlans(data[0].messId);
//     } catch (err) {
//       console.error("Error loading messes", err);
//     }
//   };

//   // 🔹 Load plans for selected mess
//   const fetchPlans = async (messId) => {
//     try {
//       const res = await fetch(
//         `http://localhost:2025/api/monthly-plans/mess/${messId}`
//       );
//       const data = await res.json();
//       setPlans(data);
//     } catch (err) {
//       console.error("Error loading plans", err);
//     }
//   };

//   // 🔹 Delete plan
//   const deletePlan = async (planId) => {
//     if (!window.confirm("Delete this plan?")) return;

//     try {
//       await fetch(
//         `http://localhost:2025/api/monthly-plans/delete/${planId}`,
//         { method: "DELETE" }
//       );
//       fetchPlans(selectedMess.messId);
//     } catch (err) {
//       console.error(err);
//       alert("Error deleting plan");
//     }
//   };

//   if (!selectedMess) return <p>No mess found</p>;

//   return (
//     <div className="monthly-plans-container">

//       {/* 🔷 Mess Selector */}
//       <div style={{ marginBottom: "20px" }}>
//         <label style={{ marginRight: "10px" }}>Select Mess:</label>
//         <select
//           value={selectedMess.messId}
//           onChange={(e) => {
//             const mess = messes.find(
//               (m) => m.messId === parseInt(e.target.value)
//             );
//             setSelectedMess(mess);
//             fetchPlans(mess.messId);
//           }}
//         >
//           {messes.map((m) => (
//             <option key={m.messId} value={m.messId}>
//               {m.messName}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* 🔷 Mess Name */}
//       <h2 className="mess-name">{selectedMess.messName}</h2>

//       {/* 🔷 Header */}
//       <div className="monthly-plans-header">
//         <h3>Monthly Plans</h3>
//         <button
//           className="add-plan-btn"
//           onClick={() => setShowModal({ visible: true, plan: null })}
//         >
//           + Add Plan
//         </button>
//       </div>

//       {/* 🔷 Plans Table */}
//       <table className="plans-table">
//         <thead>
//           <tr>
//             <th>Plan Name</th>
//             <th>Price</th>
//             <th>Meals</th>
//             <th>Validity</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {plans.length === 0 ? (
//             <tr>
//               <td colSpan="5" className="no-data">
//                 No plans added yet
//               </td>
//             </tr>
//           ) : (
//             plans.map((plan) => (
//               <tr key={plan.planId}>
//                 <td>{plan.planName}</td>
//                 <td>{plan.monthlyPrice}</td>
//                 <td>{plan.mealInclusion}</td>
//                 <td>{plan.validityPeriod}</td>
//                 <td>
//                   <button
//                     onClick={() =>
//                       setShowModal({ visible: true, plan })
//                     }
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="delete-btn"
//                     onClick={() => deletePlan(plan.planId)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* 🔷 Add / Edit Modal */}
//       {showModal.visible && (
//         <AddMonthlyPlanModal
//           mess={selectedMess}
//           plan={showModal.plan}
//           onClose={() => setShowModal({ visible: false, plan: null })}
//           onSaved={() => {
//             setShowModal({ visible: false, plan: null });
//             fetchPlans(selectedMess.messId);
//           }}
//         />
//       )}
//     </div>
//   );
// notsure}
// import { useEffect, useState } from "react";
// import AddMonthlyPlanModal from "./AddMonthlyPlanModal";
// import "../../styles/monthlyPlans.css";

// export default function MonthlyPlans() {
//   const userId = localStorage.getItem("userid");

//   const [messes, setMesses] = useState([]);
//   const [selectedMess, setSelectedMess] = useState(null);
//   const [plans, setPlans] = useState([]);
//   const [showModal, setShowModal] = useState({ visible: false, plan: null });

//   // 🔹 Load messes on page load
//   useEffect(() => {
//     fetchMesses();
//   }, []);

//   const fetchMesses = async () => {
//     try {
//       const res = await fetch(
//         `http://localhost:2025/api/messowner/messes/${userId}`
//       );
//       const data = await res.json();

//       if (!data || data.length === 0) {
//         return;
//       }

//       setMesses(data);
//       setSelectedMess(data[0]);
//       fetchPlans(data[0].messId);
//     } catch (err) {
//       console.error("Error loading messes", err);
//     }
//   };

//   // 🔹 Load plans for selected mess
//   const fetchPlans = async (messId) => {
//     try {
//       const res = await fetch(
//         `http://localhost:2025/api/monthly-plans/mess/${messId}`
//       );
//       const data = await res.json();
//       setPlans(data);
//     } catch (err) {
//       console.error("Error loading plans", err);
//     }
//   };

//   // 🔹 Delete plan
//   const deletePlan = async (planId) => {
//     if (!window.confirm("Delete this plan?")) return;

//     try {
//       await fetch(
//         `http://localhost:2025/api/monthly-plans/delete/${planId}`,
//         { method: "DELETE" }
//       );
//       fetchPlans(selectedMess.messId);
//     } catch (err) {
//       alert("Error deleting plan");
//     }
//   };

//   if (!selectedMess) return <p>No mess found</p>;

//   return (
//     <div className="monthly-plans-container">

//       {/* 🔷 Mess Selector */}
//       <div style={{ marginBottom: "20px" }}>
//         <label style={{ marginRight: "10px" }}>Select Mess:</label>
//         <select
//           value={selectedMess.messId}
//           onChange={(e) => {
//             const mess = messes.find(
//               (m) => m.messId === parseInt(e.target.value)
//             );
//             setSelectedMess(mess);
//             fetchPlans(mess.messId);
//           }}
//         >
//           {messes.map((m) => (
//             <option key={m.messId} value={m.messId}>
//               {m.messName}
//             </option>
//           ))}
//         </select>
//       </div>

//       <h2 className="mess-name">{selectedMess.messName}</h2>

//       <div className="monthly-plans-header">
//         <h3>Monthly Plans</h3>
//         <button
//           className="add-plan-btn"
//           onClick={() => setShowModal({ visible: true, plan: null })}
//         >
//           + Add Plan
//         </button>
//       </div>

//       <table className="plans-table">
//         <thead>
//           <tr>
//             <th>Plan Name</th>
//             <th>Price</th>
//             <th>Meals</th>
//             <th>Validity</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {plans.length === 0 ? (
//             <tr>
//               <td colSpan="5" className="no-data">
//                 No plans added yet
//               </td>
//             </tr>
//           ) : (
//             plans.map((plan) => (
//               <tr key={plan.planId}>
//                 <td>{plan.planName}</td>
//                 <td>{plan.monthlyPrice}</td>
//                 <td>{plan.mealInclusion}</td>
//                 <td>{plan.validityPeriod}</td>
//                 <td>
//                   <button
//                     onClick={() =>
//                       setShowModal({ visible: true, plan })
//                     }
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="delete-btn"
//                     onClick={() => deletePlan(plan.planId)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* 🔷 Modal */}
//       {showModal.visible && (
//         <AddMonthlyPlanModal
//            messes={messes}              // ✅ IMPORTANT
//     selectedMess={selectedMess}  // ✅ IMPORTANT
//     plan={showModal.plan}
//     onClose={() => setShowModal({ visible: false, plan: null })}
//     onSaved={() => {
//       setShowModal({ visible: false, plan: null });
//       fetchPlans(selectedMess.messId);
//           }}
//         />
//       )}
//     </div>
//   );

// notsave}
import { useEffect, useState } from "react";
import AddMonthlyPlanModal from "./AddMonthlyPlanModal";
import "../../styles/monthlyPlans.css";

export default function MonthlyPlans() {
  const userId = localStorage.getItem("userid");

  const [messes, setMesses] = useState([]);
  const [selectedMess, setSelectedMess] = useState(null);
  const [plans, setPlans] = useState([]);
  const [showModal, setShowModal] = useState({ visible: false, plan: null });

  // Load messes on page load
  useEffect(() => {
    fetchMesses();
  }, []);

  const fetchMesses = async () => {
    try {
      const res = await fetch(
        `http://localhost:2025/api/messowner/messes/${userId}`
      );
      const data = await res.json();

      if (!data || data.length === 0) return;

      setMesses(data);
      setSelectedMess(data[0]);
      fetchPlans(data[0].messId);
    } catch (err) {
      console.error("Error loading messes", err);
    }
  };

  const fetchPlans = async (messId) => {
    try {
      const res = await fetch(
        `http://localhost:2025/api/monthly-plans/mess/${messId}`
      );
      const data = await res.json();
      setPlans(data);
    } catch (err) {
      console.error("Error loading plans", err);
    }
  };

  const deletePlan = async (planId) => {
    if (!window.confirm("Delete this plan?")) return;
    try {
      await fetch(
        `http://localhost:2025/api/monthly-plans/delete/${planId}`,
        { method: "DELETE" }
      );
      fetchPlans(selectedMess.messId);
    } catch (err) {
      alert("Error deleting plan");
    }
  };

  if (!selectedMess) return <p>No mess found</p>;

  return (
    <div className="monthly-plans-container">
      {/* Mess Selector */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px" }}>Select Mess:</label>
        <select
          value={selectedMess.messId}
          onChange={(e) => {
            const mess = messes.find(
              (m) => m.messId === parseInt(e.target.value)
            );
            setSelectedMess(mess);
            fetchPlans(mess.messId);
          }}
        >
          {messes.map((m) => (
            <option key={m.messId} value={m.messId}>
              {m.messName}
            </option>
          ))}
        </select>
      </div>

      <h2 className="mess-name">{selectedMess.messName}</h2>

      <div className="monthly-plans-header">
        <h3>Monthly Plans</h3>
        <button
          className="add-plan-btn"
          onClick={() => setShowModal({ visible: true, plan: null })}
        >
          + Add Plan
        </button>
      </div>

      <table className="plans-table">
        <thead>
          <tr>
            <th>Plan Name</th>
            <th>Price</th>
            <th>Meals</th>
            <th>Validity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {plans.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-data">
                No plans added yet
              </td>
            </tr>
          ) : (
            plans.map((plan) => (
              <tr key={plan.planId}>
                <td>{plan.planName}</td>
                <td>{plan.monthlyPrice}</td>
                <td>{plan.mealInclusion}</td>
                <td>{plan.validityPeriod}</td>
                <td>
                  <button
                    onClick={() => setShowModal({ visible: true, plan })}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deletePlan(plan.planId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal */}
      {showModal.visible && (
        <AddMonthlyPlanModal
          messes={messes}
          selectedMess={selectedMess} // ✅ Pass selectedMess
          plan={showModal.plan}
          onClose={() => setShowModal({ visible: false, plan: null })}
          onSaved={() => {
            setShowModal({ visible: false, plan: null });
            fetchPlans(selectedMess.messId);
          }}
        />
      )}
    </div>
  );
}

