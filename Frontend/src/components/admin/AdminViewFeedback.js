import "../../styles/dashboard.css";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFeedback } from "../../adminFeedbackSlice";

function StarRating({ rating }) {
  return (
    <span style={{ color: "#ffc107", fontSize: "17px" }}>
      {"★".repeat(Math.round(rating))}
      {"☆".repeat(5 - Math.round(rating))}
    </span>
  );
}

export default function AdminViewFeedback() {
  const dispatch = useDispatch();
  const { feedbacks, loading, error } = useSelector(
    (state) => state.adminFeedback
  );

  const [expandedMess, setExpandedMess] = useState(null);
  const [sortOrder, setSortOrder] = useState("high");

  useEffect(() => {
    dispatch(fetchAllFeedback());
  }, [dispatch]);

  const groupedMessFeedback = useMemo(() => {
    const map = {};

    feedbacks.forEach((f) => {
      if (!map[f.messName]) {
        map[f.messName] = {
          messName: f.messName,
          messAddress: f.messAddress,
          ratings: [],
          feedbackList: [],
        };
      }
      map[f.messName].ratings.push(f.rating);
      map[f.messName].feedbackList.push(f);
    });

    return Object.values(map).map((m) => ({
      ...m,
      averageRating:
        m.ratings.reduce((a, b) => a + b, 0) / m.ratings.length,
    }));
  }, [feedbacks]);

 
  const sortedMess = useMemo(() => {
    return [...groupedMessFeedback].sort((a, b) =>
      sortOrder === "high"
        ? b.averageRating - a.averageRating
        : a.averageRating - b.averageRating
    );
  }, [groupedMessFeedback, sortOrder]);

  if (loading) return <p className="text-center mt-4">Loading feedback...</p>;
  if (error) return <p className="text-danger text-center mt-4">{error}</p>;

  return (
    <div className="container-fluid px-3">
      {/* HEADER */}
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h4 className="fw-bold mb-1">Mess Feedback</h4>
          <p className="text-muted small mb-0">
            Average ratings with detailed user feedback
          </p>
        </div>

        {/* SORT FILTER */}
        <select
          className="form-select w-auto shadow-sm"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="high">Rating: High → Low</option>
          <option value="low">Rating: Low → High</option>
        </select>
      </div>

      {/* CARD */}
      <div className="card shadow border-0 rounded-4">
        <div className="card-body p-4">
          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Mess</th>
                  <th>Address</th>
                  <th>Average Rating</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {sortedMess.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      No feedback found
                    </td>
                  </tr>
                ) : (
                  sortedMess.map((m, index) => (
                    <>
                      {/* MAIN ROW */}
                      <tr
                        key={m.messName}
                        className="hover-shadow"
                        style={{ transition: "0.2s ease" }}
                      >
                        <td>{index + 1}</td>
                        <td className="fw-semibold">{m.messName}</td>
                        <td className="text-muted small">{m.messAddress}</td>
                        <td>
                          <StarRating rating={m.averageRating} />
                          <span className="text-muted small ms-1">
                            ({m.averageRating.toFixed(1)})
                          </span>
                        </td>
                        <td className="text-center">
                          <button
                            className={`btn btn-sm ${
                              expandedMess === m.messName
                                ? "btn-outline-danger"
                                : "btn-outline-primary"
                            } rounded-pill px-3`}
                            onClick={() =>
                              setExpandedMess(
                                expandedMess === m.messName
                                  ? null
                                  : m.messName
                              )
                            }
                          >
                            {expandedMess === m.messName
                              ? "Hide Ratings"
                              : "View Ratings"}
                          </button>
                        </td>
                      </tr>

                      {/* EXPANDED RATINGS */}
                      {expandedMess === m.messName && (
                        <tr>
                          <td colSpan="5">
                            <div className="p-3 bg-light rounded-4 shadow-sm">
                              <table className="table table-sm mb-0">
                                <thead>
                                  <tr>
                                    <th>User</th>
                                    <th>Rating</th>
                                    <th>Comment</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {m.feedbackList.map((f) => (
                                    <tr key={f.ratingId}>
                                      <td>{f.userName}</td>
                                      <td>
                                        <StarRating rating={f.rating} />
                                      </td>
                                      <td className="text-muted">
                                        {f.comments || "—"}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}