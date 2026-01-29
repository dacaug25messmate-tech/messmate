import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/messform.css";

export default function MessForm({ userId, mode = "add", messData, onSaved, onCancel }) {
  const emptyForm = {
    messName: "",
    messAddress: "",
    messType: "",
    lunchTime: "10:00 - 14:00",
    dinnerTime: "18:00 - 22:00",
    cityId: "",
    areaId: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  // Prefill form in edit mode
  useEffect(() => {
    if (mode === "edit" && messData) {
      setForm({
        messName: messData.messName || "",
        messAddress: messData.messAddress || "",
        messType: messData.messType || "",
        lunchTime: messData.lunchTime || `${messData.lunchOpenTime} - ${messData.lunchCloseTime}`,
        dinnerTime: messData.dinnerTime || `${messData.dinnerOpenTime} - ${messData.dinnerCloseTime}`,
        cityId: messData.cityId || "",
        areaId: messData.areaId || "",
      });
      setSelectedCity(messData.cityId || "");
    } else {
      setForm(emptyForm);
    }
  }, [mode, messData]);

  // Load cities
  useEffect(() => {
    fetch("http://localhost:2025/api/cities")
      .then(res => res.json())
      .then(setCities)
      .catch(err => console.error("Failed to load cities:", err));
  }, []);

  // Load areas when city changes
  useEffect(() => {
    if (!selectedCity) {
      setAreas([]);
      setForm(prev => ({ ...prev, areaId: "" }));
      return;
    }
    fetch(`http://localhost:2025/api/areas/${selectedCity}`)
      .then(res => res.json())
      .then(setAreas)
      .catch(err => console.error("Failed to load areas:", err));
  }, [selectedCity]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (name === "cityId") setSelectedCity(value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      ...form,
      userId,
      ...(mode === "edit" && { messId: messData.messId }),
      cityId: parseInt(form.cityId),
      areaId: parseInt(form.areaId),
    };

    try {
      const url = "http://localhost:2025/api/messowner/mess";
      const method = mode === "edit" ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save mess");

      toast.success(mode === "edit" ? "Mess updated successfully!" : "Mess added successfully!");
      onSaved && onSaved(await res.json());
    } catch (err) {
      console.error(err);
      toast.error("Error saving mess. Try again.");
    }
  };

  return (
    <div className="mess-form-container">
      <form className="mess-info-form" onSubmit={handleSubmit}>
        <h4>{mode === "edit" ? "Edit Mess" : "Add New Mess"}</h4>

        <label>Mess Name <span style={{ color: "red" }}>*</span></label>
        <input name="messName" value={form.messName} onChange={handleChange} required />

        <label>Mess Address <span style={{ color: "red" }}>*</span></label>
        <input name="messAddress" value={form.messAddress} onChange={handleChange} required />

        <label>Mess Type <span style={{ color: "red" }}>*</span></label>
        <input name="messType" value={form.messType} onChange={handleChange} required />

        <label>Lunch Time <span style={{ color: "red" }}>*</span></label>
        <input name="lunchTime" value={form.lunchTime} onChange={handleChange} placeholder="HH:MM - HH:MM" required />

        <label>Dinner Time <span style={{ color: "red" }}>*</span></label>
        <input name="dinnerTime" value={form.dinnerTime} onChange={handleChange} placeholder="HH:MM - HH:MM" required />

        <label>City <span style={{ color: "red" }}>*</span></label>
        <select name="cityId" value={form.cityId} onChange={handleChange} required>
          <option value="">Select City</option>
          {cities.map(c => <option key={c.cityId} value={c.cityId}>{c.cityName}</option>)}
        </select>

        <label>Area <span style={{ color: "red" }}>*</span></label>
        <select name="areaId" value={form.areaId} onChange={handleChange} required disabled={!selectedCity}>
          <option value="">Select Area</option>
          {areas.map(a => <option key={a.areaId} value={a.areaId}>{a.area_name}</option>)}
        </select>

        <div className="form-buttons">
          <button type="submit" className="primary-btn">{mode === "edit" ? "Update Mess" : "Add Mess"}</button>
          {mode === "edit" && <button type="button" className="secondary-btn" onClick={onCancel}>Cancel</button>}
        </div>
      </form>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
