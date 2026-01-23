import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [questions, setQuestions] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({ mode: "onSubmit" });

  const selectedCity = watch("cityId");

  useEffect(() => {
    fetch("http://localhost:2025/api/cities")
      .then(res => res.json())
      .then(setCities);

    fetch("http://localhost:2025/api/security-questions")
      .then(res => res.json())
      .then(setQuestions);
  }, []);

  useEffect(() => {
    if (!selectedCity) return;

    fetch(`http://localhost:2025/api/areas/${selectedCity}`)
      .then(res => res.json())
      .then(setAreas);
  }, [selectedCity]);

  const onSubmit = async (formData) => {
    try {
      const response = await fetch("http://localhost:2025/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Registration failed");

      toast.success("Registered successfully!");
      setTimeout(() => window.location.href = "/", 1500);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>

        <h4>Register</h4>

        {/* Role */}
        <label>Role <span style={{ color: "red" }}>*</span></label>
        <select
          className="form-select mb-2"
          {...register("roleId", { required: "Please select a role" })}
        >
          <option value="">Select Role</option>
          <option value="2">Mess Owner</option>
          <option value="3">Customer</option>
        </select>
        {errors.roleId && <small className="text-danger">{errors.roleId.message}</small>}<br></br>

        {/* Username */}
        <label>Username <span style={{ color: "red" }}>*</span></label>
        <input
          className="form-control mb-2"
          placeholder="Username"
          {...register("userName", {
            required: "Username is required",
            minLength: { value: 3, message: "Username must be at least 3 characters" },
            pattern: {
              value: /^[A-Za-z]+$/,
              message: "Username should contain only letters"
            }
          })}
        />
        {errors.userName && <small className="text-danger">{errors.userName.message}</small>}<br></br>

        {/* Password */}
        <label>Password <span style={{ color: "red" }}>*</span></label>
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,12}$/,
              message: "Password must be 8-12 chars, include uppercase, lowercase, number & special char"
            }
          })}
        />
        {errors.password && <small className="text-danger">{errors.password.message}</small>}<br></br>

        {/* Email */}
        <label>Email <span style={{ color: "red" }}>*</span></label>
        <input
          className="form-control mb-2"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format"
            }
          })}
        />
        {errors.email && <small className="text-danger">{errors.email.message}</small>}<br></br>

        {/* Phone */}
        <label>Phone <span style={{ color: "red" }}>*</span></label>
        <input
          className="form-control mb-2"
          placeholder="Phone"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^[6-9]\d{9}$/,
              message: "Phone number must be 10 digits starting with 6-9"
            }
          })}
        />
        {errors.phone && <small className="text-danger">{errors.phone.message}</small>}<br></br>

        {/* Address */}
        <label>Address <span style={{ color: "red" }}>*</span></label>
        <input
          className="form-control mb-2"
          placeholder="Address"
          {...register("address", { required: "Address is required" })}
        />
        {errors.address && <small className="text-danger">{errors.address.message}</small>}<br></br>

        {/* City */}
        <label>City <span style={{ color: "red" }}>*</span></label>
        <select
          className="form-select mb-2"
          {...register("cityId", { required: "Please select a city" })}
        >
          <option value="">Select City</option>
          {cities.map(c => (
            <option key={c.cityId} value={c.cityId}>{c.cityName}</option>
          ))}
        </select>
        {errors.cityId && <small className="text-danger">{errors.cityId.message}</small>}<br></br>

        {/* Area */}
        <label>Area <span style={{ color: "red" }}>*</span></label>
        <select
          className="form-select mb-2"
          disabled={!selectedCity}
          {...register("areaId", { required: "Please select an area" })}
        >
          <option value="">Select Area</option>
          {areas.map(a => (
            <option key={a.areaId} value={a.areaId}>{a.area_name}</option>
          ))}
        </select>
        {errors.areaId && <small className="text-danger">{errors.areaId.message}</small>}<br></br>

        {/* Security Question */}
        <label>Security Question <span style={{ color: "red" }}>*</span></label>
        <select
          className="form-select mb-2"
          {...register("questionId", { required: "Please select a security question" })}
        >
          <option value="">Select Question</option>
          {questions.map(q => (
            <option key={q.questionId} value={q.questionId}>{q.questionText}</option>
          ))}
        </select>
        {errors.questionId && <small className="text-danger">{errors.questionId.message}</small>}<br></br>

        {/* Answer */}
        <label>Answer <span style={{ color: "red" }}>*</span></label>
        <input
          className="form-control mb-3"
          placeholder="Your Answer"
          {...register("questionAnswer", { required: "Answer is required" })}
        />
        {errors.questionAnswer && <small className="text-danger">{errors.questionAnswer.message}</small>}<br></br>

        <button className="btn btn-success w-100">Register</button>
      </form>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
