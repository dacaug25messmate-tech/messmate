import { useEffect, useState } from "react";
import "../../styles/mySubscriptions.css";
import { customer_url } from "../rest_endpoints";

export default function MySubscriptions() {
  const userId = localStorage.getItem("userid");
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch(`${customer_url}/subscriptions/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setSubscriptions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId]);

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-warning"></div>
      </div>
    );

  if (subscriptions.length === 0)
    return (
      <div className="text-center mt-5 text-muted">
        <p>No subscriptions found</p>
      </div>
    );

  const filteredSubscriptions =
    filter === "All"
      ? subscriptions
      : subscriptions.filter((s) => s.status === filter);

  const getStatusColor = (status) =>
    status === "Active" ? "#06d6a0" : "#f94144";

  const getProgress = (startDate, endDate) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();
    if (now >= end) return 100;
    return ((now - start) / (end - start)) * 100;
  };

  const getRemainingDays = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="subscriptions-wrapper">
      <h4 className="fw-semibold mb-4 text-center">My Subscriptions</h4>

      {/* Filter */}
      <div className="mb-4 d-flex justify-content-end align-items-center">
        <label className="me-2 fw-semibold">View:</label>
        <select
          className="form-select w-auto"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
        </select>
      </div>

      {/* Subscription Cards */}
      <div className="subscriptions-grid">
        {filteredSubscriptions.map((s) => {
          const progress = getProgress(s.startDate, s.endDate);
          const remainingDays = getRemainingDays(s.endDate);

          return (
            <div
              key={s.subscriptionId}
              className={`subscription-card ${
                s.status === "Expired" ? "expired-card" : ""
              }`}
            >
              <div className="card-header">
                <div className="avatar">{s.messName.charAt(0)}</div>
                <div className="card-title">
                  <h5>{s.messName}</h5>
                  <small>{s.planName}</small>
                </div>
                <span
                  className="badge"
                  style={{ background: getStatusColor(s.status) }}
                >
                  {s.status}
                </span>
              </div>

              <div className="card-body">
                <p>
                  <strong>Meals:</strong> {s.mealInclusion}
                </p>
                <p>
                  <strong>Price:</strong> ₹{s.monthlyPrice}
                </p>
                <p>
                  <strong>Duration:</strong>{" "}
                  {new Date(s.startDate).toLocaleDateString()} -{" "}
                  {new Date(s.endDate).toLocaleDateString()}
                </p>
                {/* Progress Bar with tooltip */}
                <div className="progress-wrapper mb-2" title={`${remainingDays} day(s) remaining`}>
                  <div
                    className="progress-bar"
                    style={{
                      width: `${progress}%`,
                      background: s.status === "Active" ? "#06d6a0" : "#f94144",
                    }}
                  ></div>
                </div>
                

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
