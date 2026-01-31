import "../../styles/dashboard.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFeedback } from "../../adminFeedbackSlice";

export default function AdminViewFeedback() {
  const dispatch = useDispatch();

  const { feedbacks, loading, error } = useSelector(
    (state) => state.adminFeedback
  );

  useEffect(() => {
    dispatch(fetchAllFeedback());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center mt-4">Loading feedback...</p>;
  }

  if (error) {
    return <p className="text-danger text-center mt-4">{error}</p>;
  }

  function StarRating({ rating }) {
    return (
      <span style={{ color: "#ffc107", fontSize: "18px" }}>
        {"★".repeat(rating)}
        {"☆".repeat(5 - rating)}
      </span>
    );
  }

  return (
    <div className="container-fluid px-3">

      {/* Header (same style as Disable User) */}
      <div className="mb-4">
        <h4 className="fw-bold mb-1">Mess Feedback</h4>
        <p className="text-muted small mb-0">
          Ratings and comments submitted by users
        </p>
      </div>

      {/* Card */}
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body p-4">

          <div className="table-responsive">
            <table className="table align-middle">
              
              {/* Slightly dark header */}
               <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Mess</th>
                  <th>Address</th>
                  <th>User</th>
                  <th>Rating</th>
                  <th>Comments</th>
                </tr>
              </thead>

              <tbody>
                {feedbacks.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center text-muted py-4"
                    >
                      No feedback found
                    </td>
                  </tr>
                ) : (
                  feedbacks.map((f, index) => (
                    <tr key={f.ratingId}>
                      <td>{index + 1}</td>

                      <td className="fw-semibold">
                        {f.messName}
                      </td>

                      <td className="text-muted small">
                        {f.messAddress}
                      </td>

                      <td>
                        {f.userName}
                      </td>

                      <td>
                        <StarRating rating={f.rating} />
                      </td>

                      <td className="text-muted">
                        {f.comments || "—"}
                      </td>
                    </tr>
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
