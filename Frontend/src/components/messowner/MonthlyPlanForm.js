import { useState } from "react";
export function MonthlyPlanForm({ editPlan, onSave, onClose }) {
  const [form, setForm] = useState(
    editPlan || {
      planName: "",
      monthlyPrice: "",
      mealInclusion: "Lunch",
      validityPeriod: ""
    }
  );

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{editPlan ? "Edit Monthly Plan" : "Add Monthly Plan"}</h3>

        <form onSubmit={handleSubmit} className="form-grid">
          <input
            name="planName"
            placeholder="Plan Name"
            value={form.planName}
            onChange={handleChange}
            required
          />

          <input
            name="monthlyPrice"
            type="number"
            placeholder="Monthly Price"
            value={form.monthlyPrice}
            onChange={handleChange}
            required
          />

          <select
            name="mealInclusion"
            value={form.mealInclusion}
            onChange={handleChange}
          >
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Lunch, Dinner</option>
          </select>

          <input
            name="validityPeriod"
            type="number"
            placeholder="Validity (days)"
            value={form.validityPeriod}
            onChange={handleChange}
            required
          />

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Save
            </button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
