
import { useState, useEffect } from "react";
import { messowner_url } from "../rest_endpoints";

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
      await fetch(messowner_url+"/monthly-plans/add", {
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

