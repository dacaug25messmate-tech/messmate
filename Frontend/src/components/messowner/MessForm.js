// import { useState } from "react";
// import axios from "axios";
// import "../../styles/modal.css";

// export default function AddMonthlyPlanModal({ mess, onClose, onSaved }) {
//   const [planName, setPlanName] = useState("");
//   const [price, setPrice] = useState("");
//   const [meal, setMeal] = useState("Lunch");
//   const [validity, setValidity] = useState("");

//   const handleSave = async () => {
//     if (!planName || !price || !validity) {
//       alert("All fields are required");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:2025/api/monthly-plans/add", {
//         planName,
//         monthlyPrice: price,
//         mealInclusion: meal,
//         validityPeriod: validity,
//         messId: mess.messId,
//       });

//       onSaved();
//     } catch (err) {
//       alert("Error saving plan");
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-box">
//         <h2>Add Monthly Plan</h2>

//         <select disabled>
//           <option>{mess.messName}</option>
//         </select>

//         <input
//           type="text"
//           placeholder="Plan Name"
//           value={planName}
//           onChange={(e) => setPlanName(e.target.value)}
//         />

//         <input
//           type="number"
//           placeholder="Monthly Price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         />

//         <select value={meal} onChange={(e) => setMeal(e.target.value)}>
//           <option>Lunch</option>
//           <option>Dinner</option>
//           <option>Lunch + Dinner</option>
//         </select>

//         <input
//           type="number"
//           placeholder="Validity (days)"
//           value={validity}
//           onChange={(e) => setValidity(e.target.value)}
//         />

//         <div className="modal-actions">
//           <button className="save-btn" onClick={handleSave}>
//             Save
//           </button>
//           <button className="cancel-btn" onClick={onClose}>
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// import { useState } from "react";
// import axios from "axios";
// import "../../styles/addMonthlyPlanModal.css"; // optional for styling

// export default function AddMonthlyPlanModal({ mess, onClose, onSaved }) {
//   const [planName, setPlanName] = useState("");
//   const [monthlyPrice, setMonthlyPrice] = useState("");
//   const [mealInclusion, setMealInclusion] = useState("Lunch");
//   const [validityPeriod, setValidityPeriod] = useState("");

//   const handleSave = async () => {
//     if (!planName || !monthlyPrice || !validityPeriod) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       await axios.post(
//         `http://localhost:2025/api/monthly-plans/add/${mess.messId}`,
//         {
//           planName,
//           monthlyPrice: parseFloat(monthlyPrice),
//           mealInclusion,
//           validityPeriod: parseInt(validityPeriod),
//         },
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       alert("Plan added successfully");
//       onSaved();
//     } catch (err) {
//       console.error(err);
//       alert("Error saving plan");
//     }
//   };

//   return (
//     <div className="modal-backdrop">
//       <div className="modal-content">
//         <h2>Add Monthly Plan</h2>

//         <input
//           type="text"
//           placeholder="Plan Name"
//           value={planName}
//           onChange={(e) => setPlanName(e.target.value)}
//         />

//         <input
//           type="number"
//           placeholder="Monthly Price"
//           value={monthlyPrice}
//           onChange={(e) => setMonthlyPrice(e.target.value)}
//         />

//         <select
//           value={mealInclusion}
//           onChange={(e) => setMealInclusion(e.target.value)}
//         >
//           <option value="Lunch">Lunch</option>
//           <option value="Dinner">Dinner</option>
//           <option value="Both">Both</option>
//         </select>

//         <input
//           type="number"
//           placeholder="Validity (days)"
//           value={validityPeriod}
//           onChange={(e) => setValidityPeriod(e.target.value)}
//         />

//         <div className="modal-buttons">
//           <button onClick={handleSave} className="save-btn">
//             Save
//           </button>
//           <button onClick={onClose} className="cancel-btn">
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// corrected}

// import { useState, useEffect } from "react";
// import axios from "axios";
// import "../../styles/addMonthlyPlanModal.css"; // optional for styling

// export default function AddMonthlyPlanModal({ mess, plan, onClose, onSaved }) {
//   // ✅ Use plan data if editing, else default empty
//   const [planName, setPlanName] = useState(plan?.planName || "");
//   const [monthlyPrice, setMonthlyPrice] = useState(plan?.monthlyPrice || "");
//   const [mealInclusion, setMealInclusion] = useState(plan?.mealInclusion || "Lunch");
//   const [validityPeriod, setValidityPeriod] = useState(plan?.validityPeriod || "");

//   // Optional: update form if plan prop changes
//   useEffect(() => {
//     if (plan) {
//       setPlanName(plan.planName);
//       setMonthlyPrice(plan.monthlyPrice);
//       setMealInclusion(plan.mealInclusion);
//       setValidityPeriod(plan.validityPeriod);
//     }
//   }, [plan]);

//   const handleSave = async () => {
//     if (!planName || !monthlyPrice || !validityPeriod) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       if (plan) {
//         // ✅ EDIT mode
//         await axios.put(
//           `http://localhost:2025/api/monthly-plans/update/${plan.planId}`,
//           {
//             planName,
//             monthlyPrice: parseFloat(monthlyPrice),
//             mealInclusion,
//             validityPeriod: parseInt(validityPeriod),
//           },
//           { headers: { "Content-Type": "application/json" } }
//         );
//         alert("Plan updated successfully");
//       } else {
//         // ✅ ADD mode
//         await axios.post(
//           `http://localhost:2025/api/monthly-plans/add/${mess.messId}`,
//           {
//             planName,
//             monthlyPrice: parseFloat(monthlyPrice),
//             mealInclusion,
//             validityPeriod: parseInt(validityPeriod),
//           },
//           { headers: { "Content-Type": "application/json" } }
//         );
//         alert("Plan added successfully");
//       }
//       onSaved(); // Refresh list
//     } catch (err) {
//       console.error(err);
//       alert("Error saving plan");
//     }
//   };

//   return (
//     <div className="modal-backdrop">
//       <div className="modal-content">
//         <h2>{plan ? "Edit Monthly Plan" : "Add Monthly Plan"}</h2>

//         <input
//           type="text"
//           placeholder="Plan Name"
//           value={planName}
//           onChange={(e) => setPlanName(e.target.value)}
//         />

//         <input
//           type="number"
//           placeholder="Monthly Price"
//           value={monthlyPrice}
//           onChange={(e) => setMonthlyPrice(e.target.value)}
//         />

//         <select
//           value={mealInclusion}
//           onChange={(e) => setMealInclusion(e.target.value)}
//         >
//           <option value="Lunch">Lunch</option>
//           <option value="Dinner">Dinner</option>
//           <option value="Both">Both</option>
//         </select>

//         <input
//           type="number"
//           placeholder="Validity (days)"
//           value={validityPeriod}
//           onChange={(e) => setValidityPeriod(e.target.value)}
//         />

//         <div className="modal-buttons">
//           <button onClick={handleSave} className="save-btn">
//             {plan ? "Update" : "Save"}
//           </button>
//           <button onClick={onClose} className="cancel-btn">
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// import { useEffect } from "react";
// import "../../styles/addMonthlyPlanModal.css"; // optional for styling

// export default function AddMonthlyPlanModal({ mess, plan, onClose, onSaved }) {
//   // ✅ Use plan data if editing, else default empty
//   const [planName, setPlanName] = useState(plan?.planName || "");
//   const [monthlyPrice, setMonthlyPrice] = useState(plan?.monthlyPrice || "");
//   const [mealInclusion, setMealInclusion] = useState(plan?.mealInclusion || "Lunch");
//   const [validityPeriod, setValidityPeriod] = useState(plan?.validityPeriod || "");

//   // Update form if plan prop changes
//   useEffect(() => {
//     if (plan) {
//       setPlanName(plan.planName);
//       setMonthlyPrice(plan.monthlyPrice);
//       setMealInclusion(plan.mealInclusion);
//       setValidityPeriod(plan.validityPeriod);
//     }
//   }, [plan]);

//   const handleSave = async () => {
//     if (!planName || !monthlyPrice || !validityPeriod) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       const body = {
//         planName,
//         monthlyPrice: parseFloat(monthlyPrice),
//         mealInclusion,
//         validityPeriod: parseInt(validityPeriod),
//       };

//       if (plan) {
//         // ✅ EDIT mode
//         const res = await fetch(
//           `http://localhost:2025/api/monthly-plans/update/${plan.planId}`,
//           {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(body),
//           }
//         );

//         if (!res.ok) throw new Error("Failed to update plan");
//         alert("Plan updated successfully");
//       } else {
//         // ✅ ADD mode
//         const res = await fetch(
//           `http://localhost:2025/api/monthly-plans/add/${mess.messId}`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(body),
//           }
//         );

//         if (!res.ok) throw new Error("Failed to add plan");
//         alert("Plan added successfully");
//       }

//       onSaved(); // Refresh list
//     } catch (err) {
//       console.error(err);
//       alert("Error saving plan: " + err.message);
//     }
//   };

//   return (
//     <div className="modal-backdrop">
//       <div className="modal-content">
//         <h2>{plan ? "Edit Monthly Plan" : "Add Monthly Plan"}</h2>

//         <input
//           type="text"
//           placeholder="Plan Name"
//           value={planName}
//           onChange={(e) => setPlanName(e.target.value)}
//         />

//         <input
//           type="number"
//           placeholder="Monthly Price"
//           value={monthlyPrice}
//           onChange={(e) => setMonthlyPrice(e.target.value)}
//         />

//         <select
//           value={mealInclusion}
//           onChange={(e) => setMealInclusion(e.target.value)}
//         >
//           <option value="Lunch">Lunch</option>
//           <option value="Dinner">Dinner</option>
//           <option value="Both">Both</option>
//         </select>

//         <input
//           type="number"
//           placeholder="Validity (days)"
//           value={validityPeriod}
//           onChange={(e) => setValidityPeriod(e.target.value)}
//         />

//         <div className="modal-buttons">
//           <button onClick={handleSave} className="save-btn">
//             {plan ? "Update" : "Save"}
//           </button>
//           <button onClick={onClose} className="cancel-btn">
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );}
// // corrected5555555555}
// // import "../../styles/addMonthlyPlanModal.css";
// // export default function AddMonthlyPlanModal({ messes, selectedMess, plan, onClose, onSaved }) {
// //   const [messId, setMessId] = useState(selectedMess ? selectedMess.messId : "");
// //   const [planName, setPlanName] = useState(plan ? plan.planName : "");
// //   const [price, setPrice] = useState(plan ? plan.monthlyPrice : "");
// //   const [meals, setMeals] = useState(plan ? plan.mealInclusion : "");
// //   const [validity, setValidity] = useState(plan ? plan.validityPeriod : "");

// //   const handleSave = async () => {
// //     const payload = { planName, monthlyPrice: price, mealInclusion: meals, validityPeriod: validity, messId };

// //     const url = plan
// //       ? `http://localhost:2025/api/monthly-plans/update/${plan.planId}`
// //       : `http://localhost:2025/api/monthly-plans/add`;

// //     await fetch(url, {
// //       method: plan ? "PUT" : "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(payload),
// //     });

// //     onSaved();
// //   };

// //   return (
// //     <div className="modal-backdrop">
// //       <div className="modal-content">
// //         <h2>{plan ? "Edit Plan" : "Add Plan"}</h2>

// //         <label>Mess</label>
// //         <select value={messId} onChange={e => setMessId(e.target.value)}>
// //           {messes.map(m => (
// //             <option key={m.messId} value={m.messId}>{m.messName}</option>
// //           ))}
// //         </select>

// //         <label>Plan Name</label>
// //         <input value={planName} onChange={e => setPlanName(e.target.value)} />

// //         <label>Price</label>
// //         <input type="number" value={price} onChange={e => setPrice(e.target.value)} />

// //         <label>Meals</label>
// //         <input value={meals} onChange={e => setMeals(e.target.value)} />

// //         <label>Validity (days)</label>
// //         <input type="number" value={validity} onChange={e => setValidity(e.target.value)} />

// //         <button onClick={handleSave}>{plan ? "Update" : "Add"}</button>
// //         <button onClick={onClose}+
// >Cancel</button>
// //       </div>
// //     </div>
// //   );
// // messfetch}
// import { useState } from "react";

// export default function AddMonthlyPlanModal({
//   messes,
//   defaultMess,
//   onClose,
//   onSaved
// }) {
//   const [messId, setMessId] = useState(defaultMess?.messId || "");
//   const [planName, setPlanName] = useState("");
//   const [price, setPrice] = useState("");
//   const [meal, setMeal] = useState("Lunch");
//   const [validity, setValidity] = useState("");

//   const savePlan = async () => {
//     await fetch("http://localhost:2025/api/monthly-plans/add", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         planName,
//         monthlyPrice: price,
//         mealInclusion: meal,
//         validityPeriod: validity,
//         messId
//       })
//     });

//     onSaved();
//   };

//   return (
//     <>
//       {/* 🔴 Overlay */}
//       <div
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100vw",
//           height: "100vh",
//           background: "rgba(0,0,0,0.4)",
//           zIndex: 999
//         }}
//         onClick={onClose}
//       />

//       {/* 🟢 Modal */}
//       <div
//         style={{
//           position: "fixed",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           background: "#fff",
//           padding: "20px",
//           width: "400px",
//           zIndex: 1000,
//           borderRadius: "6px"
//         }}
//       >
//         <h3>Add Monthly Plan</h3>

//         {/* ✅ Mess dropdown */}
//         <select
//           value={messId}
//           onChange={(e) => setMessId(e.target.value)}
//           style={{ width: "100%", marginBottom: "10px" }}
//         >
//           <option value="">-- Select Mess --</option>
//           {messes.map((m) => (
//             <option key={m.messId} value={m.messId}>
//               {m.messName}
//             </option>
//           ))}
//         </select>

//         <input
//           placeholder="Plan Name"
//           value={planName}
//           onChange={(e) => setPlanName(e.target.value)}
//           style={{ width: "100%", marginBottom: "10px" }}
//         />

//         <input
//           placeholder="Monthly Price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           style={{ width: "100%", marginBottom: "10px" }}
//         />

//         <select
//           value={meal}
//           onChange={(e) => setMeal(e.target.value)}
//           style={{ width: "100%", marginBottom: "10px" }}
//         >
//           <option>Lunch</option>
//           <option>Dinner</option>
//           <option>Both</option>
//         </select>

//         <input
//           placeholder="Validity (days)"
//           value={validity}
//           onChange={(e) => setValidity(e.target.value)}
//           style={{ width: "100%", marginBottom: "10px" }}
//         />

//         <div style={{ textAlign: "right" }}>
//           <button onClick={savePlan}>Save</button>
//           <button onClick={onClose} style={{ marginLeft: "10px" }}>
//             Cancel
//           </button>
//         </div>
//       </div>
//     </>
//   );
// correctedbutnotsave}
import { useState, useEffect } from "react";

export default function AddMonthlyPlanModal({
  messes,
  selectedMess,
  plan,    // If editing, you can prefill
  onClose,
  onSaved
}) {
  const [messId, setMessId] = useState(selectedMess?.messId || "");
  const [planName, setPlanName] = useState(plan?.planName || "");
  const [price, setPrice] = useState(plan?.monthlyPrice || "");
  const [meal, setMeal] = useState(plan?.mealInclusion || "Lunch");
  const [validity, setValidity] = useState(plan?.validityPeriod || "");

  useEffect(() => {
    if (plan) {
      setPlanName(plan.planName);
      setPrice(plan.monthlyPrice);
      setMeal(plan.mealInclusion);
      setValidity(plan.validityPeriod);
      setMessId(plan.messId);
    }
  }, [plan]);

  const savePlan = async () => {
    if (!messId) {
      alert("Please select a mess");
      return;
    }

    try {
      await fetch("http://localhost:2028/api/monthly-plans/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planName,
          monthlyPrice: Number(price),
          mealInclusion: meal,
          validityPeriod: Number(validity),
          messId: Number(messId)
        })
      });

      onSaved();
    } catch (err) {
      alert("Failed to save plan");
      console.error(err);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          zIndex: 999
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#fff",
          padding: "20px",
          width: "400px",
          zIndex: 1000,
          borderRadius: "6px"
        }}
      >
        <h3>{plan ? "Edit Plan" : "Add Monthly Plan"}</h3>

        <select
          value={messId}
          onChange={(e) => setMessId(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        >
          <option value="">-- Select Mess --</option>
          {messes.map((m) => (
            <option key={m.messId} value={m.messId}>
              {m.messName}
            </option>
          ))}
        </select>

        <input
          placeholder="Plan Name"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          placeholder="Monthly Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <select
          value={meal}
          onChange={(e) => setMeal(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        >
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Both</option>
        </select>

        <input
          placeholder="Validity (days)"
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <div style={{ textAlign: "right" }}>
          <button onClick={savePlan}>Save</button>
          <button onClick={onClose} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

