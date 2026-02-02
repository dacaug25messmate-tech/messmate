import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { auth_url } from "./rest_endpoints";

export default function ForgotPassword({ onBackToLogin }) {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null);
  const [questionId, setQuestionId] = useState(null);
  const [questionText, setQuestionText] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const navigate = useNavigate();

  // SAME password pattern as Register
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,12}$/;

  useEffect(() => {
    if (redirectToLogin) {
      navigate("/login", { replace: true });
    }
  }, [redirectToLogin, navigate]);

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${auth_url}/getUserByUsername/${username}`);
      if (!res.ok) return toast.error("User not found");
      const data = await res.json();
      setUserId(data.userId);
      setQuestionId(data.questionId);
      setQuestionText(data.questionText);
      setStep(2);
    } catch {
      toast.error("Server error. Try again later.");
    }
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { userId, questionId, answer, newPassword: "TEMP" };
      const res = await fetch(`${auth_url}/forgotPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.status === 200 && data.status === "SUCCESS") {
        toast.success("Answer correct! Set your new password below.");
        setStep(3);
      } else if (res.status === 401 && data.status === "INVALID_ANSWER") {
        const remaining = data.message.match(/\d+/);
        const newAttempts = remaining ? parseInt(remaining[0]) : attemptsLeft - 1;
        setAttemptsLeft(newAttempts);

        if (newAttempts <= 0) {
          toast.error("Maximum attempts exceeded. Redirecting to login...");
          setTimeout(() => {
  onBackToLogin(); 
}, 1500);

        } else {
          toast.error(data.message);
        }
      } else if (res.status === 403 && data.status === "ACCOUNT_LOCKED") {
        toast.error("Account locked. Redirecting to login...");
        setTimeout(() => {
  onBackToLogin(); 
}, 1500);

      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch {
      toast.error("Network error. Try again later.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword)
      return toast.error("Please fill both password fields");

    
    if (!passwordPattern.test(newPassword)) {
      return toast.error(
        "Password must be 8–12 chars with uppercase, lowercase, number & special character"
      );
    }

    if (newPassword !== confirmPassword)
      return toast.error("Passwords do not match");

    try {
      const payload = { userId, questionId, answer, newPassword };
      const res = await fetch(`${auth_url}/forgotPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok && data.status === "SUCCESS") {
      toast.success("Password reset successfully! Redirecting to login...");
      setTimeout(() => {
  onBackToLogin(); 
}, 1500);

      }
      else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch {
      toast.error("Network error. Try again later.");
    }
  };

  return (
    <div className="auth-container">
      {step === 1 && (
        <form className="auth-form" onSubmit={handleUsernameSubmit}>
          <h4>Forgot Password</h4>
          <div className="mb-3">
            <label>Username</label>
            <input
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary w-100">Next</button>
        </form>
      )}

      {step === 2 && (
        <form className="auth-form" onSubmit={handleAnswerSubmit}>
          <h4>Security Question</h4>
          <p><strong>{questionText}</strong></p>
          <div className="mb-3">
            <label>Answer</label>
            <input
              className="form-control"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary w-100">Verify Answer</button>
          <p className="mt-2 text-muted">Attempts left: {attemptsLeft}</p>
        </form>
      )}

      {step === 3 && (
        <form className="auth-form" onSubmit={handleResetPassword}>
          <h4>Set New Password</h4>
          <div className="mb-3">
            <label>New Password</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-success w-100">Reset Password</button>
        </form>
      )}
    </div>
  );
}
