import { useState, useEffect } from "react";
import { messowner_url } from "../rest_endpoints";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AddMonthlyPlanModal({
  messes,
  defaultMess,
  plan,
  onClose,
  onSaved
}) {
  const [messId, setMessId] = useState(defaultMess?.messId || "");
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
    if (!messId || !planName || !price || !validity) {
      alert("Please fill all fields");
      return;
    }

    try {
      await fetch(`${messowner_url}/monthly-plans/add`, {
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
      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>

      {/* Modal */}
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">
                {plan ? "Edit Monthly Plan" : "Add Monthly Plan"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">
              {/* Mess */}
              <div className="mb-3">
                <label className="form-label">Mess</label>
                <select
                  className="form-select"
                  value={messId}
                  onChange={(e) => setMessId(e.target.value)}
                >
                  <option value="">-- Select Mess --</option>
                  {messes.map((m) => (
                    <option key={m.messId} value={m.messId}>
                      {m.messName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Plan Name */}
              <div className="mb-3">
                <label className="form-label">Plan Name</label>
                <input
                  className="form-control"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                />
              </div>

              {/* Price */}
              <div className="mb-3">
                <label className="form-label">Monthly Price</label>
                <input
                  type="number"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              {/* Meal */}
              <div className="mb-3">
                <label className="form-label">Meals Included</label>
                <select
                  className="form-select"
                  value={meal}
                  onChange={(e) => setMeal(e.target.value)}
                >
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Both</option>
                </select>
              </div>

              {/* Validity */}
              <div className="mb-3">
                <label className="form-label">Validity (days)</label>
                <input
                  type="number"
                  className="form-control"
                  value={validity}
                  onChange={(e) => setValidity(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={savePlan}>
                Save
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
