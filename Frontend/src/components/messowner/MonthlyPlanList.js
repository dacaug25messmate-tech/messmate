// import { useEffect, useState } from "react";
// import AddMonthlyPlanModal from "./AddMonthlyPlanModal";
// import "../../styles/monthlyPlans.css";

// export default function MonthlyPlans() {
//   const userId = localStorage.getItem("userid");

//   const [messes, setMesses] = useState([]);
//   const [selectedMess, setSelectedMess] = useState(null);
//   const [plans, setPlans] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     loadMesses();
//   }, []);

//   const loadMesses = async () => {
//     const res = await fetch(
//       `http://localhost:2028/api/messowner/messes/${userId}`
//     );
//     const data = await res.json();

//     setMesses(data);
//     setSelectedMess(data[0]);
//     loadPlans(data[0].messId);
//   };

//   const loadPlans = async (messId) => {
//     const res = await fetch(
//       `http://localhost:2028/api/monthly-plans/mess/${messId}`
//     );
//     const data = await res.json();
//     setPlans(data);
//   };

//   const deletePlan = async (id) => {
//     if (!window.confirm("Delete this plan?")) return;

//     await fetch(
//       `http://localhost:2028/api/monthly-plans/delete/${id}`,
//       { method: "DELETE" }
//     );
//     loadPlans(selectedMess.messId);
//   };

//   if (!selectedMess) return null;

//   return (
//     <div className="monthly-plans-container">

//       {/* 🔹 Mess Selector */}
//       <select
//         value={selectedMess.messId}
//         onChange={(e) => {
//           const mess = messes.find(
//             (m) => m.messId === Number(e.target.value)
//           );
//           setSelectedMess(mess);
//           loadPlans(mess.messId);
//         }}
//       >
//         {messes.map((m) => (
//           <option key={m.messId} value={m.messId}>
//             {m.messName}
//           </option>
//         ))}
//       </select>

//       <div className="monthly-plans-header">
//         <h3>Monthly Plans</h3>
//         <button onClick={() => setShowModal(true)}>+ Add Plan</button>
//       </div>

//       <table className="plans-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Meals</th>
//             <th>Validity</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {plans.map((p) => (
//             <tr key={p.planId}>
//               <td>{p.planName}</td>
//               <td>{p.monthlyPrice}</td>
//               <td>{p.mealInclusion}</td>
//               <td>{p.validityPeriod}</td>
//               <td>
//                 <button onClick={() => deletePlan(p.planId)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {showModal && (
//         <AddMonthlyPlanModal
//           messes={messes}
//           defaultMess={selectedMess}
//           onClose={() => setShowModal(false)}
//           onSaved={() => {
//             setShowModal(false);
//             loadPlans(selectedMess.messId);
//           }}
//         />
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import AddMonthlyPlanModal from "./AddMonthlyPlanModal";
import "../../styles/monthlyPlans.css";

export default function MonthlyPlans() {
  const userId = localStorage.getItem("userid");

  const [messes, setMesses] = useState([]);
  const [selectedMess, setSelectedMess] = useState(null);
  const [plans, setPlans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadMesses();
  }, []);

  const loadMesses = async () => {
    try {
      const res = await fetch(
        `http://localhost:2028/api/messowner/messes/${userId}`
      );

      if (!res.ok) throw new Error("Failed to load messes");

      const data = await res.json();
      setMesses(Array.isArray(data) ? data : []);

      if (Array.isArray(data) && data.length > 0) {
        setSelectedMess(data[0]);
        loadPlans(data[0].messId);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to load messes");
    }
  };

  const loadPlans = async (messId) => {
    try {
      const res = await fetch(
        `http://localhost:2028/api/messowner/monthly-plans/${messId}`
      );

      if (!res.ok) throw new Error("Failed to load plans");

      const data = await res.json();
      setPlans(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setPlans([]);
    }
  };

  const deletePlan = async (id) => {
    if (!window.confirm("Delete this plan?")) return;

    try {
      await fetch(
        `http://localhost:2028/api/messowner/monthly-plans/${id}`,
        { method: "DELETE" }
      );

      loadPlans(selectedMess.messId);
    } catch (err) {
      console.error(err);
    }
  };

  if (!selectedMess) {
    return <p>No mess available</p>;
  }

  return (
    <div className="monthly-plans-container">

      {error && <p className="error-text">{error}</p>}

      {/* 🔹 Mess Selector */}
      <select
        value={selectedMess.messId}
        onChange={(e) => {
          const mess = messes.find(
            (m) => m.messId === Number(e.target.value)
          );
          setSelectedMess(mess);
          loadPlans(mess.messId);
        }}
      >
        {messes.map((m) => (
          <option key={m.messId} value={m.messId}>
            {m.messName}
          </option>
        ))}
      </select>

      <div className="monthly-plans-header">
        <h3>Monthly Plans</h3>
        <button onClick={() => setShowModal(true)}>+ Add Plan</button>
      </div>

      <table className="plans-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Meals</th>
            <th>Validity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {plans.length === 0 ? (
            <tr>
              <td colSpan="5">No plans found</td>
            </tr>
          ) : (
            plans.map((p) => (
              <tr key={p.planId}>
                <td>{p.planName}</td>
                <td>{p.monthlyPrice}</td>
                <td>{p.mealInclusion}</td>
                <td>{p.validityPeriod}</td>
                <td>
                  <button onClick={() => deletePlan(p.planId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showModal && (
        <AddMonthlyPlanModal
          messes={messes}
          defaultMess={selectedMess}
          onClose={() => setShowModal(false)}
          onSaved={() => {
            setShowModal(false);
            loadPlans(selectedMess.messId);
          }}
        />
      )}
    </div>
  );
}
