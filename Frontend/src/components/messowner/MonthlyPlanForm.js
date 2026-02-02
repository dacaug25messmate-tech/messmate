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

  const [errors, setErrors] = useState({});

  /* ========== HANDLE CHANGE ========== */
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  /* ========== VALIDATION ========== */
  const validate = () => {
    const newErrors = {};

    if (!form.planName || form.planName.trim().length < 3)
      newErrors.planName = "Plan name must be at least 3 characters";

    if (!form.monthlyPrice || Number(form.monthlyPrice) <= 0)
      newErrors.monthlyPrice = "Monthly price must be greater than 0";

    if (!form.validityPeriod || Number(form.validityPeriod) <= 0)
      newErrors.validityPeriod = "Validity must be greater than 0 days";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ========== SUBMIT ========== */
  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    onSave(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{editPlan ? "Edit Monthly Plan" : "Add Monthly Plan"}</h3>

        <form onSubmit={handleSubmit} className="form-grid">
          {/* Plan Name */}
          <div>
            <input
              name="planName"
              placeholder="Plan Name"
              value={form.planName}
              onChange={handleChange}
              className={errors.planName ? "error-input" : ""}
            />
            {errors.planName && <small className="error">{errors.planName}</small>}
          </div>

          {/* Monthly Price */}
          <div>
            <input
              name="monthlyPrice"
              type="number"
              placeholder="Monthly Price"
              value={form.monthlyPrice}
              onChange={handleChange}
              className={errors.monthlyPrice ? "error-input" : ""}
            />
            {errors.monthlyPrice && (
              <small className="error">{errors.monthlyPrice}</small>
            )}
          </div>

          {/* Meal Inclusion */}
          <select
            name="mealInclusion"
            value={form.mealInclusion}
            onChange={handleChange}
          >
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Lunch, Dinner</option>
          </select>

          {/* Validity */}
          <div>
            <input
              name="validityPeriod"
              type="number"
              placeholder="Validity (days)"
              value={form.validityPeriod}
              onChange={handleChange}
              className={errors.validityPeriod ? "error-input" : ""}
            />
            {errors.validityPeriod && (
              <small className="error">{errors.validityPeriod}</small>
            )}
          </div>

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
