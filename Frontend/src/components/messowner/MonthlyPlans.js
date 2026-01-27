import { useEffect, useState } from "react";
import axios from "axios";
import { MonthlyPlanForm } from "./MonthlyPlanForm";

export default function MonthlyPlans({ messId }) {
  const [plans, setPlans] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editPlan, setEditPlan] = useState(null);

  const backendUrl = "http://localhost:2025/api/monthlyplans"; // your backend

  // Fetch plans from backend
  useEffect(() => {
    axios.get(`${backendUrl}/mess/${messId}`)
      .then(res => setPlans(res.data))
      .catch(err => console.error("Error fetching plans:", err));
  }, [messId]);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this plan?")) return;

    // frontend delete only (temporary)
    setPlans(plans.filter(p => p.planId !== id));

    // optional backend delete
    axios.delete(`${backendUrl}/${id}`)
      .then(res => console.log("Deleted", res.data))
      .catch(err => console.error("Error deleting plan:", err));
  };

  const handleSave = (plan) => {
    if (editPlan) {
      // frontend update
      setPlans(plans.map(p => p.planId === editPlan.planId ? { ...editPlan, ...plan } : p));

      // backend update
      axios.put(`${backendUrl}/${editPlan.planId}`, plan)
        .then(res => console.log("Updated", res.data))
        .catch(err => console.error("Error updating plan:", err));
    } else {
      const newPlan = { ...plan, planId: Date.now() }; // temp id
      setPlans([...plans, newPlan]);

      // backend add
      axios.post(`${backendUrl}`, { ...plan, messId })
        .then(res => console.log("Added", res.data))
        .catch(err => console.error("Error adding plan:", err));
    }
    setShowForm(false);
  };

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <h3>Monthly Plans</h3>
        <button className="btn-primary" onClick={() => {
          setEditPlan(null);
          setShowForm(true);
        }}>
          + Add Plan
        </button>
      </div>

      <table className="profile-table">
        <thead>
          <tr>
            <th>Plan Name</th>
            <th>Price (₹)</th>
            <th>Meals</th>
            <th>Validity (Days)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {plans.length === 0 && (
            <tr>
              <td colSpan="5" align="center">No plans added</td>
            </tr>
          )}

          {plans.map(plan => (
            <tr key={plan.planId}>
              <td>{plan.planName}</td>
              <td>{plan.monthlyPrice}</td>
              <td>{plan.mealInclusion}</td>
              <td>{plan.validityPeriod}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => {
                    setEditPlan(plan);
                    setShowForm(true);
                  }}
                >
                  Edit
                </button>

                <button
                  className="btn-delete"
                  onClick={() => handleDelete(plan.planId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <MonthlyPlanForm
          editPlan={editPlan}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
