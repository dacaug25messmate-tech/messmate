import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/messform.css";
import { admin_url, messowner_url } from "../rest_endpoints";

export default function AddMessForm({ userId, mode = "add", messData, onSaved, onCancel }) {

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
  const [message, setMessage] = useState("");
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  // Prefill form in edit mode
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
        cityId: messData.areaId?.city?.cityId || "", // assuming area has city
        areaId: messData.areaId?.areaId || ""
      });
    } else {
      setForm(emptyForm);
    }
  }, [mode, messData]);

  // Fetch cities
  useEffect(() => {
  fetch(admin_url + "/cities")
    .then(res => res.json())
    .then(data => {
      // SAFETY: ensure array
      if (Array.isArray(data)) {
        setCities(data);
      } else if (Array.isArray(data.data)) {
        setCities(data.data);
      } else {
        setCities([]);
      }
    })
    .catch(err => {
      console.error(err);
      setCities([]);
    });
}, []);


  // Fetch areas whenever city changes
  useEffect(() => {
    if (!form.cityId) {
      setAreas([]);
      setForm(prev => ({ ...prev, areaId: "" }));
      return;
    }
    fetch(`${admin_url}/areas/${form.cityId}`)
      .then(res => res.json())
      .then(setAreas)
      .catch(err => console.error(err));
  }, [form.cityId]);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");

    const url = messowner_url+"/mess";
    const method = mode === "edit" ? "put" : "post";

    try {
      const dto = {
        ...form,
        userId,
        ...(mode === "edit" && { messId: messData.messId }),
        areaId: form.areaId ? parseInt(form.areaId) : null,
        cityId: form.cityId ? parseInt(form.cityId) : null
      };

      const res = await axios({ method, url, data: dto });
      setMessage(mode === "edit" ? "Mess updated successfully!" : "Mess added successfully!");
      onSaved && onSaved(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage("Failed to save mess");
    }
  };

  return (
    <form className="mess-info-form" onSubmit={handleSubmit}>

      <div className="info-row">
        <label>Mess Name</label>
        <input name="messName" value={form.messName} onChange={handleChange} required />
      </div>

      <div className="info-row">
        <label>Mess Address</label>
        <input name="messAddress" value={form.messAddress} onChange={handleChange} required />
      </div>

      <div className="info-row">
        <label>Mess Type</label>
        <input name="messType" value={form.messType} onChange={handleChange} required />
      </div>

      <div className="info-row">
        <label>Lunch Time</label>
        <div className="time-box">
          <input type="time" name="lunchOpenTime" value={form.lunchOpenTime} onChange={handleChange} />
          <span>-</span>
          <input type="time" name="lunchCloseTime" value={form.lunchCloseTime} onChange={handleChange} />
        </div>
      </div>

      <div className="info-row">
        <label>Dinner Time</label>
        <div className="time-box">
          <input type="time" name="dinnerOpenTime" value={form.dinnerOpenTime} onChange={handleChange} />
          <span>-</span>
          <input type="time" name="dinnerCloseTime" value={form.dinnerCloseTime} onChange={handleChange} />
        </div>
      </div>

      {/* City Dropdown */}
      <div className="info-row">
        <label>City</label>
        <select name="cityId" value={form.cityId} onChange={handleChange} required>
          <option value="">Select City</option>
          {cities.map(c => (
            <option key={c.cityId} value={c.cityId}>{c.cityName}</option>
          ))}
        </select>
      </div>

      {/* Area Dropdown */}
      <div className="info-row">
        <label>Area</label>
        <select
          name="areaId"
          value={form.areaId}
          onChange={handleChange}
          required
          disabled={!form.cityId || areas.length === 0}
        >
          <option value="">Select Area</option>
          {areas.map(a => (
            <option key={a.areaId} value={a.areaId}>{a.area_name}</option>
          ))}
        </select>
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
