import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/messform.css";
import { auth_url, messowner_url } from "../rest_endpoints";

export default function AddMessForm({
  userId,
  mode = "add",
  messData,
  onSaved,
  onCancel= () => window.history.back()
}) {
  const emptyForm = {
    messName: "",
    messAddress: "",
    messType: "",
    lunchOpenTime: "10:00",
    lunchCloseTime: "14:00",
    dinnerOpenTime: "18:00",
    dinnerCloseTime: "22:00",
    cityId: "",
    areaId: ""
  };

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  /* ========== PREFILL EDIT ========== */
  useEffect(() => {
    if (mode === "edit" && messData) {
      setForm({
        messName: messData.messName || "",
        messAddress: messData.messAddress || "",
        messType: messData.messType || "",
        lunchOpenTime: messData.lunchOpenTime?.substring(0, 5) || "10:00",
        lunchCloseTime: messData.lunchCloseTime?.substring(0, 5) || "14:00",
        dinnerOpenTime: messData.dinnerOpenTime?.substring(0, 5) || "18:00",
        dinnerCloseTime: messData.dinnerCloseTime?.substring(0, 5) || "22:00",
        cityId: messData.areaId?.city?.cityId || "",
        areaId: messData.areaId?.areaId || ""
      });
    }
  }, [mode, messData]);

  /* ========== LOAD CITIES ========== */
  useEffect(() => {
    fetch(auth_url + "/cities")
      .then(res => res.json())
      .then(data => setCities(Array.isArray(data) ? data : data.data || []))
      .catch(() => setCities([]));
  }, []);

  /* ========== LOAD AREAS ========== */
  useEffect(() => {
    if (!form.cityId) {
      setAreas([]);
      setForm(prev => ({ ...prev, areaId: "" }));
      return;
    }

    fetch(`${auth_url}/areas/${form.cityId}`)
      .then(res => res.json())
      .then(setAreas)
      .catch(() => setAreas([]));
  }, [form.cityId]);

  /* ========== HANDLE CHANGE ========== */
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  /* ========== VALIDATION ========== */
  const validate = () => {
    const newErrors = {};

    if (!form.messName || form.messName.trim().length < 3)
      newErrors.messName = "Mess name must be at least 3 characters";

    if (!form.messAddress || form.messAddress.trim().length < 5)
      newErrors.messAddress = "Address must be at least 5 characters";

    if (!form.messType)
      newErrors.messType = "Mess type is required";

    if (!form.cityId)
      newErrors.cityId = "Please select a city";

    if (!form.areaId)
      newErrors.areaId = "Please select an area";

    if (form.lunchOpenTime >= form.lunchCloseTime)
      newErrors.lunchTime = "Lunch open time must be before close time";

    if (form.dinnerOpenTime >= form.dinnerCloseTime)
      newErrors.dinnerTime = "Dinner open time must be before close time";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ========== SUBMIT ========== */
  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");

    if (!validate()) return;

    try {
      const dto = {
        ...form,
        userId,
        ...(mode === "edit" && { messId: messData?.messId }),
        cityId: parseInt(form.cityId),
        areaId: parseInt(form.areaId)
      };

      const res = await axios({
        method: mode === "edit" ? "put" : "post",
        url: messowner_url + "/mess",
        data: dto
      });

      setMessage(
        mode === "edit"
          ? "Mess updated successfully!"
          : "Mess added successfully!"
      );

      onSaved && onSaved(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage("Failed to save mess");
    }
  };

  return (
    <form className="mess-info-form" onSubmit={handleSubmit}>

      {/* Mess Name */}
      <div className="info-row">
        <label>Mess Name</label>
        <input
          name="messName"
          value={form.messName}
          onChange={handleChange}
          className={errors.messName ? "error-input" : ""}
        />
        {errors.messName && <small className="error">{errors.messName}</small>}
      </div>

     {/* Address */}
      <div className="info-row">
         <label>Mess Address</label>
         <input
           name="messAddress"
          value={form.messAddress}
          onChange={handleChange}
          className={errors.messAddress ? "error-input" : ""}
        />
        {errors.messAddress && <small className="error">{errors.messAddress}</small>}
      </div>


      {/* Mess Type Dropdown */}
      <div className="info-row">
        <label>Mess Type</label>
        <select
          name="messType"
          value={form.messType}
          onChange={handleChange}
          className={errors.messType ? "error-input" : ""}
        >
          <option value="">Select Mess Type</option>
          <option value="VEG">VEG</option>
          <option value="NON_VEG">NON-VEG</option>
          <option value="JAIN">JAIN</option>
        </select>
        {errors.messType && <small className="error">{errors.messType}</small>}
      </div>

      {/* Lunch */}
      <div className="info-row">
        <label>Lunch Time</label>
        <div className="time-box">
          <input
            type="time"
            name="lunchOpenTime"
            value={form.lunchOpenTime}
            onChange={handleChange}
            className={errors.lunchTime ? "error-input" : ""}
          />
          <span>-</span>
          <input
            type="time"
            name="lunchCloseTime"
            value={form.lunchCloseTime}
            onChange={handleChange}
            className={errors.lunchTime ? "error-input" : ""}
          />
        </div>
        {errors.lunchTime && <small className="error">{errors.lunchTime}</small>}
      </div>

      {/* Dinner */}
      <div className="info-row">
        <label>Dinner Time</label>
        <div className="time-box">
          <input
            type="time"
            name="dinnerOpenTime"
            value={form.dinnerOpenTime}
            onChange={handleChange}
            className={errors.dinnerTime ? "error-input" : ""}
          />
          <span>-</span>
          <input
            type="time"
            name="dinnerCloseTime"
            value={form.dinnerCloseTime}
            onChange={handleChange}
            className={errors.dinnerTime ? "error-input" : ""}
          />
        </div>
        {errors.dinnerTime && <small className="error">{errors.dinnerTime}</small>}
      </div>

      {/* City */}
      <div className="info-row">
        <label>City</label>
        <select
          name="cityId"
          value={form.cityId}
          onChange={handleChange}
          className={errors.cityId ? "error-input" : ""}
        >
          <option value="">Select City</option>
          {cities.map(c => (
            <option key={c.cityId} value={c.cityId}>
              {c.cityName}
            </option>
          ))}
        </select>
        {errors.cityId && <small className="error">{errors.cityId}</small>}
      </div>

      {/* Area */}
      <div className="info-row">
        <label>Area</label>
        <select
          name="areaId"
          value={form.areaId}
          onChange={handleChange}
          disabled={!form.cityId}
          className={errors.areaId ? "error-input" : ""}
        >
          <option value="">Select Area</option>
          {areas.map(a => (
            <option key={a.areaId} value={a.areaId}>
              {a.area_name}
            </option>
          ))}
        </select>
        {errors.areaId && <small className="error">{errors.areaId}</small>}
      </div>

      <div className="form-buttons">
        <button type="submit" className="primary-btn">
          {mode === "edit" ? "Update Mess" : "Add Mess"}
        </button>

        {mode === "edit" && (
          <button type="button" className="secondary-btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>

      {message && <p className="form-message">{message}</p>}
    </form>
  );
}