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
        `http://localhost:2028/api/messowner/messes/${userId}`
      );
      if (!res.ok) throw new Error("Failed to load messes");

      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) return;

      setMesses(data);
      setSelectedMess(data[0]);
      fetchPlans(data[0].messId);
    } catch (err) {
      console.error("Error loading messes", err);
      setMesses([]);
      setSelectedMess(null);
    }
  };

  const fetchPlans = async (messId) => {
    try {
      const res = await fetch(
        `http://localhost:2028/api/messowner/monthly-plans/${messId}`
      );
      if (!res.ok) throw new Error("Failed to load plans");

      const data = await res.json();
      setPlans(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading plans", err);
      setPlans([]);
    }
  };

  const deletePlan = async (planId) => {
    if (!window.confirm("Delete this plan?")) return;

    try {
      await fetch(
        `http://localhost:2028/api/messowner/monthly-plans/${planId}`,
        { method: "DELETE" }
      );
      fetchPlans(selectedMess.messId);
    } catch (err) {
      console.error("Error deleting plan", err);
      alert("Failed to delete plan");
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
          selectedMess={selectedMess}
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
