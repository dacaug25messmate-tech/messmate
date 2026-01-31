import { useEffect, useState } from "react";
import "../../styles/ProfileEditCss.css";
import { messowner_url } from "../rest_endpoints";

export default function EditProfileForm({ profileData, onCancel, onSaved }) {
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
    setErrors({ ...errors, [e.target.name]: "" }); // clear error while typing
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
      const res = await fetch(
        messowner_url+"/profile/update",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: localStorage.getItem("userid"),
            ...formData,
          }),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      await res.json();
      onSaved();
    } catch (err) {
      console.error(err);
      alert("Profile update failed");
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <h3>Edit Profile</h3>

      <label>Full Name</label>
      <input
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
      />
      {errors.fullName && <span className="error">{errors.fullName}</span>}

      <label>Email</label>
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <span className="error">{errors.email}</span>}

      <label>Phone</label>
      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        maxLength="10"
      />
      {errors.phone && <span className="error">{errors.phone}</span>}

      <label>Address</label>
      <input
        name="address"
        value={formData.address}
        onChange={handleChange}
      />
      {errors.address && <span className="error">{errors.address}</span>}

      <div style={{ marginTop: "15px" }}>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: "10px" }}>
          Cancel
        </button>
      </div>
    </form>
  );
}
