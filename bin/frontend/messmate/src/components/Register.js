import { useState, useEffect } from "react";

export default function Register() {
  const [form, setForm] = useState({
    userName: "",
    password: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    cityId: "",        // store selected city ID
    areaId: "",        // store selected area ID
    questionId: "",    // security question ID
    questionAnswer: "",
    roleId: ""  
  });

  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [questions, setQuestions] = useState([]);

  // Fetch cities and security questions on component mount
  useEffect(() => {
    fetch("http://localhost:2025/api/cities")
      .then(res => res.json())
      .then(data => setCities(data))
      .catch(err => console.error("Error fetching cities:", err));

    fetch("http://localhost:2025/api/security-questions")
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.error("Error fetching questions:", err));
  }, []);

  // Fetch areas when a city is selected
  useEffect(() => {
    if (!form.cityId) return;

    fetch(`http://localhost:2025/api/areas/${form.cityId}`)
      .then(res => res.json())
      .then(data => setAreas(data))
      .catch(err => console.error("Error fetching areas:", err));
  }, [form.cityId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.userName || !form.password || !form.fullName) { 
      alert("Please fill required fields (username, password, full name).");
      return;
    }

    try {
      const response = await fetch("http://localhost:2025/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Registration failed");
      }

      const data = await response.json();
      console.log("Registration success:", data);
      alert("Registered successfully!");
      window.location.href = "/"; // redirect to login
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="container mt-4 auth-container">
      <h4 className="mb-3">Register</h4>

      <form onSubmit={handleSubmit} className="auth-form">
        {/* ROLE DROPDOWN */}
        <div className="mb-2">
          <select
            name="roleId"
            className="form-select mb-2"
            value={form.roleId}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="2">Mess Owner</option>
            <option value="3">Customer</option>
          </select>
        </div>

        <div className="mb-2">
          <input
            name="userName"
            className="form-control"
            placeholder="Username"
            value={form.userName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <input
            name="fullName"
            className="form-control"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <input
            name="phone"
            className="form-control"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <input
            name="address"
            className="form-control"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        {/* City Dropdown */}
        <div className="mb-2">
          <select
            name="cityId"
            className="form-select"
            value={form.cityId}
            onChange={handleChange}
          >
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city.cityId} value={city.cityId}>
                {city.cityName}
              </option>
            ))}
          </select>
        </div>

        {/* Area Dropdown (depends on selected city) */}
        <div className="mb-2">
          <select
            name="areaId"
            className="form-select"
            value={form.areaId}
            onChange={handleChange}
            disabled={!form.cityId}
          >
            <option value="">Select Area</option>
            {areas.map(area => (
              <option key={area.areaId} value={area.areaId}>
                {area.area_name}
              </option>
            ))}
          </select>
        </div>

        {/* Security Question Dropdown */}
        <div className="mb-2">
          <select
            name="questionId"
            className="form-select"
            value={form.questionId}
            onChange={handleChange}
          >
            <option value="">Select Security Question</option>
            {questions.map(q => (
              <option key={q.questionId} value={q.questionId}>
                {q.questionText}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <input
            name="questionAnswer"
            className="form-control"
            placeholder="Your Answer"
            value={form.questionAnswer}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Register
        </button>
      </form>
    </div>
  );
}