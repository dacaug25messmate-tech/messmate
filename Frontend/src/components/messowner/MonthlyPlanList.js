import { useEffect, useState } from "react";
import AddMonthlyPlanModal from "./AddMonthlyPlanModal";
import { messowner_url } from "../rest_endpoints";
import "bootstrap/dist/css/bootstrap.min.css";

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

  // 🔹 Load all messes of owner
  const loadMesses = async () => {
    try {
      const res = await fetch(`${messowner_url}/messes/${userId}`);
      if (!res.ok) throw new Error();

      const data = await res.json();
      setMesses(Array.isArray(data) ? data : []);

      if (data.length > 0) {
        setSelectedMess(data[0]);
        loadPlans(data[0].messId);
      }
    } catch {
      setError("Unable to load messes");
    }
  };

  // 🔹 Load plans for mess
  const loadPlans = async (messId) => {
    try {
      const res = await fetch(`${messowner_url}/monthly-plans/${messId}`);
      if (!res.ok) throw new Error();
      setPlans(await res.json());
    } catch {
      setPlans([]);
    }
  };

  // 🔹 Delete plan (backend protected)
  const deletePlan = async (plan) => {
    if (plan.activeSubscriberCount > 0) {
      alert(
        `This plan has ${plan.activeSubscriberCount} active subscriber(s) and cannot be deleted.`
      );
      return;
    }

    if (!window.confirm("Are you sure you want to delete this plan?")) return;

    try {
      const res = await fetch(
        `${messowner_url}/monthly-plans/delete/${plan.planId}`,
        { method: "DELETE" }
      );

      if (res.status === 409) {
        const msg = await res.text();
        alert(msg || "This plan is already subscribed.");
        return;
      }

      if (!res.ok) throw new Error();

      loadPlans(selectedMess.messId);
    } catch {
      alert("Error deleting plan. Please try again.");
    }
  };

  if (!selectedMess) {
    return <p className="text-center mt-4">No mess available</p>;
  }

  return (
    <div className="container mt-4">
      {/* Error */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Mess Selector */}
      <div className="mb-3">
        <select
          className="form-select"
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
      </div>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Monthly Plans</h3>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add Plan
        </button>
      </div>

      {/* Plans Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Meals</th>
            <th>Validity</th>
            <th>Subscribers</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {plans.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No plans found
              </td>
            </tr>
          ) : (
            plans.map((p) => (
              <tr key={p.planId}>
                <td>{p.planName}</td>
                <td>₹ {p.monthlyPrice}</td>
                <td>{p.mealInclusion}</td>
                <td>{p.validityPeriod}</td>
                <td>
                  {p.activeSubscriberCount > 0 ? (
                    <span className="text-danger fw-bold">
                      {p.activeSubscriberCount}
                    </span>
                  ) : (
                    <span className="text-success">0</span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    disabled={p.activeSubscriberCount > 0}
                    title={
                      p.activeSubscriberCount > 0
                        ? "Plan has active subscribers"
                        : "Delete plan"
                    }
                    onClick={() => deletePlan(p)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Add Plan Modal */}
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