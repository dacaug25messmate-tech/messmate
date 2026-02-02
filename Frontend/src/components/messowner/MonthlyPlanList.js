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

  const loadMesses = async () => {
    try {
      const res = await fetch(`${messowner_url}/messes/${userId}`);
      if (!res.ok) throw new Error("Failed to load messes");

      const data = await res.json();
      setMesses(Array.isArray(data) ? data : []);

      if (data.length > 0) {
        setSelectedMess(data[0]);
        loadPlans(data[0].messId);
      }
    } catch (err) {
      setError("Unable to load messes");
    }
  };

  const loadPlans = async (messId) => {
    try {
      const res = await fetch(`${messowner_url}/monthly-plans/${messId}`);
      if (!res.ok) throw new Error();
      setPlans(await res.json());
    } catch {
      setPlans([]);
    }
  };

  const deletePlan = async (id) => {
    if (!window.confirm("Delete this plan?")) return;

    await fetch(`${messowner_url}/monthly-plans/delete/${id}`, {
      method: "DELETE",
    });

    loadPlans(selectedMess.messId);
  };

  if (!selectedMess) {
    return <p className="text-center mt-4">No mess available</p>;
  }

  return (
    <div className="container mt-4">

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

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
        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Add Plan
        </button>
      </div>

      {/* Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
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
              <td colSpan="5" className="text-center">
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
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deletePlan(p.planId)}
                  >
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
