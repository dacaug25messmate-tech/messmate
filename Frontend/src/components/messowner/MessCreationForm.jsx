import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MessCreationForm() {
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetch("http://localhost:2025/api/cities")
      .then(res => res.json())
      .then(setCities);
  }, []);

  useEffect(() => {
    if (!selectedCity) return;
    fetch(`http://localhost:2025/api/areas/${selectedCity}`)
      .then(res => res.json())
      .then(setAreas);
  }, [selectedCity]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const payload = {
      messName: form.messName.value,
      address: form.address.value,
      cityId: parseInt(form.cityId.value),
      areaId: parseInt(form.areaId.value),
      ownerId: parseInt(localStorage.getItem("userid")), // owner ID from registration
    };

    try {
      const response = await fetch("http://localhost:2025/mess/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        toast.error("Failed to add mess. Try again.");
        return;
      }

      toast.success("Mess added successfully!");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Server error. Try later.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h4>Create Your Mess</h4>

        <label>Mess Name <span style={{ color: "red" }}>*</span></label>
        <input className="form-control mb-2" name="messName" placeholder="Mess Name" required />

        <label>City <span style={{ color: "red" }}>*</span></label>
        <select
          className="form-select mb-2"
          name="cityId"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          required
        >
          <option value="">Select City</option>
          {cities.map(c => <option key={c.cityId} value={c.cityId}>{c.cityName}</option>)}
        </select>

        <label>Area <span style={{ color: "red" }}>*</span></label>
        <select className="form-select mb-2" name="areaId" required disabled={!selectedCity}>
          <option value="">Select Area</option>
          {areas.map(a => <option key={a.areaId} value={a.areaId}>{a.area_name}</option>)}
        </select>

        <label>Address <span style={{ color: "red" }}>*</span></label>
        <input className="form-control mb-3" name="address" placeholder="Address" required />

        <button className="btn btn-success w-100">Add Mess</button>
      </form>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
