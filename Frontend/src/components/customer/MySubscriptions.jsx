import { useEffect, useState } from "react";
import { customer_url } from "../rest_endpoints";
import "../../styles/mySubscriptions.css";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MySubscriptions() {
  const userId = parseInt(localStorage.getItem("userid"));

  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const [visitData, setVisitData] = useState({});

  /* ================= FETCH SUBSCRIPTIONS ================= */
  useEffect(() => {
    fetch(`${customer_url}/subscriptions/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setSubscriptions(data);
        setLoading(false);

        data.forEach((sub) => {
          fetch(
            `${customer_url}/subscription/${sub.subscriptionId}/visit-summary`
          )
            .then((res) => res.json())
            .then((visit) =>
              setVisitData((prev) => ({
                ...prev,
                [sub.subscriptionId]: visit,
              }))
            );
        });
      })
      .catch(() => {
        toast.error("Failed to load subscriptions");
        setLoading(false);
      });
  }, [userId]);

  /* ================= SUBMIT RATING ================= */
  const handleRatingSubmit = async (subscriptionId, messId) => {
    const rating = ratings[subscriptionId];
    const comment = comments[subscriptionId] || "";

    if (!rating || rating < 1 || rating > 5) {
      toast.warning("Please select a rating between 1 and 5");
      return;
    }

    //  FIXED PAYLOAD KEYS
    const payload = {
      userId: userId,
      messId: messId,
      rating: rating,
      comments: comment,
    };
    console.log("RATE PAYLOAD =>", payload);


    try {
      const res = await fetch(`${customer_url}/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Rating submission failed");
      }

      toast.success(" Rating submitted successfully!", {
  containerId: "global",
});

      //  CLEAR FORM AFTER SUBMIT
      setRatings((prev) => ({
        ...prev,
        [subscriptionId]: 0,
      }));

      setComments((prev) => ({
        ...prev,
        [subscriptionId]: "",
      }));
    } catch (err) {
      toast.error(err.message);
    }
  };

  /* ================= HELPERS ================= */
  const getStatusColor = (status) =>
    status === "Active" ? "#06d6a0" : "#f94144";

  const getProgress = (startDate, endDate) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const now = Date.now();
    if (now >= end) return 100;
    return Math.max(0, ((now - start) / (end - start)) * 100);
  };

  const getRemainingDays = (endDate) => {
    const diff = new Date(endDate).getTime() - Date.now();
    return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
  };

  /* ================= UI STATES ================= */
  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-warning"></div>
      </div>
    );
  }

  if (subscriptions.length === 0) {
    return (
      <div className="text-center mt-5 text-muted">
        <p>No subscriptions found</p>
      </div>
    );
  }

  const filteredSubscriptions =
    filter === "All"
      ? subscriptions
      : subscriptions.filter((s) => s.status === filter);

  /* ================= RENDER ================= */
  return (
    <div className="container my-4">
      <h3 className="text-center mb-4">My Subscriptions</h3>

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

      <div className="row g-4">
        {filteredSubscriptions.map((s) => {
          const progress = getProgress(s.startDate, s.endDate);
          const remainingDays = getRemainingDays(s.endDate);
          const visits = visitData[s.subscriptionId] || {
            totalVisits: 0,
            totalUnVisits: 0,
          };

          return (
            <div key={s.subscriptionId} className="col-md-6 col-lg-4">
              <div
                className={`card shadow-sm border-0 ${
                  s.status === "Expired" ? "opacity-75" : ""
                }`}
              >
                <div className="card-body">
                  {/* Header */}
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-circle text-white d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: "#1d4ed8",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      {s.messName.charAt(0)}
                    </div>

                    <div className="flex-grow-1">
                      <h5 className="mb-0">{s.messName}</h5>
                      <small className="text-muted">{s.planName}</small>
                    </div>

                    <span
                      className="badge"
                      style={{
                        backgroundColor: getStatusColor(s.status),
                        color: "#fff",
                      }}
                    >
                      {s.status}
                    </span>
                  </div>

                  <p><strong>Meals:</strong> {s.mealInclusion}</p>
                  <p><strong>Price:</strong> ₹{s.monthlyPrice}</p>

                  <p>
                    <strong>Duration:</strong>{" "}
                    {new Date(s.startDate).toLocaleDateString()} -{" "}
                    {new Date(s.endDate).toLocaleDateString()} (
                    {remainingDays} days remaining)
                  </p>

                  <div className="progress mb-2" style={{ height: 8 }}>
                    <div
                      className="progress-bar"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: getStatusColor(s.status),
                      }}
                    />
                  </div>

                  <p>
                    <strong>Visited:</strong> {visits.totalVisits} |{" "}
                    <strong>Unvisited:</strong> {visits.totalUnVisits}
                  </p>

                  {/* ===== RATING ONLY FOR ACTIVE ===== */}
                  {s.status === "Active" && (
                    <>
                      <div className="d-flex mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            size={20}
                            className="me-1"
                            color={
                              ratings[s.subscriptionId] >= star
                                ? "#ffc107"
                                : "#e4e5e9"
                            }
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              setRatings({
                                ...ratings,
                                [s.subscriptionId]: star,
                              })
                            }
                          />
                        ))}
                      </div>

                      <textarea
                        className="form-control mb-2"
                        placeholder="Leave a comment"
                        rows={2}
                        value={comments[s.subscriptionId] || ""}
                        onChange={(e) =>
                          setComments({
                            ...comments,
                            [s.subscriptionId]: e.target.value,
                          })
                        }
                      />

                      <button
                        className="btn btn-primary w-100"
                        onClick={() =>
                          handleRatingSubmit(
                            s.subscriptionId,
                            s.messId
                          )
                        }
                      >
                        Submit Rating
                      </button>
                    </>
                  )}

                  {/* ===== EXPIRED MESSAGE ===== */}
                  {s.status === "Expired" && (
                    <p className="text-muted fst-italic mt-2">
                      Rating is allowed only for active subscriptions
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}