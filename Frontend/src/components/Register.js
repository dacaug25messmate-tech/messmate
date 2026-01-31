import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth_url } from "./rest_endpoints";

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
    fetch(auth_url+"/cities")
      .then(res => res.json())
      .then(setCities);

    fetch(auth_url+"/security-questions")
      .then(res => res.json())
      .then(setQuestions);
  }, []);

  useEffect(() => {
    if (!selectedCity) return;

    fetch(`${auth_url}/areas/${selectedCity}`)
      .then(res => res.json())
      .then(setAreas);
  }, [selectedCity]);

  const onSubmit = async (formData) => {
    const payload = {
      ...formData,
      status: formData.roleId === "3" ? "APPROVE" : "PENDING"
    };

    try {
      const response = await fetch(auth_url+"/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      // Username already exists
      if (response.status === 409) {
        const msg = await response.text();
        toast.error(msg || "Username already exists");
        return;
      }

      // Other errors
      if (!response.ok) {
        toast.error("Registration failed. Please try again.");
        return;
      }

      toast.success("Registered successfully!");
      setTimeout(() => window.location.href = "/", 1500);

    } catch (error) {
      toast.error("Server not responding");
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
        {errors.roleId && <small className="text-danger">{errors.roleId.message}</small>}
        <br />

        {/* Full Name */}
        <label>Full Name <span style={{ color: "red" }}>*</span></label>
        <input
          className="form-control mb-2"
          placeholder="Full Name"
          {...register("fullName", {
            required: "Full name is required",
            minLength: { value: 3, message: "Full name must be at least 3 characters" },
            pattern: {
              value: /^[A-Za-z ]+$/,
              message: "Full name should contain only letters"
            }
          })}
        />
        {errors.fullName && <small className="text-danger">{errors.fullName.message}</small>}
        <br />

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
        {errors.userName && <small className="text-danger">{errors.userName.message}</small>}
        <br />

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
              message: "8-12 chars, uppercase, lowercase, number & special char"
            }
          })}
        />
        {errors.password && <small className="text-danger">{errors.password.message}</small>}
        <br />

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
        {errors.email && <small className="text-danger">{errors.email.message}</small>}
        <br />

        {/* Phone */}
        <label>Phone <span style={{ color: "red" }}>*</span></label>
        <input
          className="form-control mb-2"
          placeholder="Phone"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^[6-9]\d{9}$/,
              message: "10 digits starting with 6-9"
            }
          })}
        />
        {errors.phone && <small className="text-danger">{errors.phone.message}</small>}
        <br />

        {/* Address */}
        <label>Address <span style={{ color: "red" }}>*</span></label>
        <input
          className="form-control mb-2"
          placeholder="Address"
          {...register("address", { required: "Address is required" })}
        />
        {errors.address && <small className="text-danger">{errors.address.message}</small>}
        <br />

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
        {errors.cityId && <small className="text-danger">{errors.cityId.message}</small>}
        <br />

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
        {errors.areaId && <small className="text-danger">{errors.areaId.message}</small>}
        <br />

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
        {errors.questionId && <small className="text-danger">{errors.questionId.message}</small>}
        <br />

        {/* Answer */}
        <label>Answer <span style={{ color: "red" }}>*</span></label>
        <input
          className="form-control mb-3"
          placeholder="Your Answer"
          {...register("questionAnswer", { required: "Answer is required" })}
        />
        {errors.questionAnswer && <small className="text-danger">{errors.questionAnswer.message}</small>}
        <br />

        <button className="btn btn-success w-100">Register</button>
      </form>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}