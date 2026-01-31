import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/customerProfile.css"; // custom CSS
import { customer_url } from "../rest_endpoints";

export default function CustomerProfile() {
  const userId = localStorage.getItem("userid");

  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch(customer_url+"/cities")
      .then((res) => res.json())
      .then(setCities);
  }, []);

  useEffect(() => {
    if (!userId) return;

    fetch(`${customer_url}/profile/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setFormData({
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });
        setSelectedCity(data.cityId?.toString() || "");
        setSelectedArea(data.areaId?.toString() || "");

        if (data.cityId) {
          fetch(`${customer_url}/areas/${data.cityId}`)
            .then((res) => res.json())
            .then(setAreas);
        }
      });
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);
    setSelectedArea("");
    setErrors({ ...errors, city: "", area: "" });

    if (cityId) {
      fetch(`${customer_url}/areas/${cityId}`)
        .then((res) => res.json())
        .then(setAreas);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    if (!formData.phone.trim()) newErrors.phone = "Required";
    if (!formData.address.trim()) newErrors.address = "Required";
    if (!selectedCity) newErrors.city = "Required";
    if (!selectedArea) newErrors.area = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = () => {
    if (!validate()) {
      toast.error("Please fix errors");
      return;
    }

    fetch(`${customer_url}/profile/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, areaId: parseInt(selectedArea) }),
    })
      .then(() => {
        toast.success("Profile updated");
        setEditMode(false);
      })
      .catch(() => toast.error("Update failed"));
  };

  if (!profile) return <div className="text-center mt-5">Loading...</div>;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-9 col-md-10">

            {/* Profile Card */}
            <div className="card shadow profile-card">
              <div className="card-body">

                {/* HEADER */}
                <div className="d-flex align-items-center mb-4">
                  <div
                    className="rounded-circle avatar text-white d-flex align-items-center justify-content-center me-3"
                  >
                    {profile.fullName?.charAt(0)}
                  </div>
                  <div>
                    <h5 className="mb-1">{profile.fullName}</h5>
                    <small className="text-muted">@{profile.userName}</small>
                  </div>
                </div>

                {/* FORM */}
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Full Name</label>
                    <input
                      className="form-control"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                    {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                    {errors.email && <small className="text-danger">{errors.email}</small>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Mobile</label>
                    <input
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                    {errors.phone && <small className="text-danger">{errors.phone}</small>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Address</label>
                    <input
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                    {errors.address && <small className="text-danger">{errors.address}</small>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">City</label>
                    <select
                      className="form-select"
                      value={selectedCity}
                      onChange={handleCityChange}
                      disabled={!editMode}
                    >
                      <option value="">Select</option>
                      {cities.map((c) => (
                        <option key={c.cityId} value={c.cityId}>
                          {c.cityName}
                        </option>
                      ))}
                    </select>
                    {errors.city && <small className="text-danger">{errors.city}</small>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Area</label>
                    <select
                      className="form-select"
                      value={selectedArea}
                      onChange={(e) => setSelectedArea(e.target.value)}
                      disabled={!editMode || !selectedCity}
                    >
                      <option value="">Select</option>
                      {areas.map((a) => (
                        <option key={a.areaId} value={a.areaId}>
                          {a.areaName}
                        </option>
                      ))}
                    </select>
                    {errors.area && <small className="text-danger">{errors.area}</small>}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="d-flex justify-content-end gap-2 mt-4">
                  {!editMode ? (
                    <button className="btn btn-warning" onClick={() => setEditMode(true)}>
                      Edit Profile
                    </button>
                  ) : (
                    <>
                      <button className="btn btn-success" onClick={handleUpdate}>
                        Save
                      </button>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => setEditMode(false)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}