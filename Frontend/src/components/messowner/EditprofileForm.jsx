import { useEffect, useState } from "react";
import { messowner_url } from "../rest_endpoints";
import "bootstrap/dist/css/bootstrap.min.css";

export default function EditProfileForm({ profileData, onCancel= () => window.history.back(), onSaved }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profileData) {
      setFormData({
        fullName: profileData.fullName || "",
        email: profileData.email || "",
        phone: profileData.phone || "",
        address: profileData.address || "",
      });
      setLoading(false);
    }
  }, [profileData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.fullName || formData.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.address || formData.address.trim().length < 3) {
      newErrors.address = "Address must be at least 3 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch(`${messowner_url}/profile/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: localStorage.getItem("userid"),
          ...formData,
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      await res.json();
      onSaved();
    } catch (err) {
      console.error(err);
      alert("Profile update failed");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
          <p className="mt-3">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4">

              <h3 className="text-center mb-4 fw-bold text-primary">
                Edit Profile
              </h3>

              <form onSubmit={handleSubmit}>

                {/* Full Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">
                    {errors.fullName}
                  </div>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">
                    {errors.email}
                  </div>
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    maxLength="10"
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    placeholder="10 digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">
                    {errors.phone}
                  </div>
                </div>

                {/* Address */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Address</label>
                  <textarea
                    name="address"
                    rows="2"
                    className={`form-control ${errors.address ? "is-invalid" : ""}`}
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">
                    {errors.address}
                  </div>
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={onCancel}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                  >
                    Save Changes
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
