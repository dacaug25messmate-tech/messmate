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
    <div>
      <h2 className="mb-4">Mess Feedback</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Mess Name</th>
              <th>Address</th>
              <th>User</th>
              <th>Rating</th>
              <th>Comments</th>
            </tr>
          </thead>

          <tbody>
            {feedbacks.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No feedback found
                </td>
              </tr>
            ) : (
              feedbacks.map((f, index) => (
                <tr key={f.ratingId}>
                  <td>{index + 1}</td>
                  <td>{f.messName}</td>
                  <td>{f.messAddress}</td>
                  <td>{f.userName}</td>
                  <td><StarRating rating={f.rating} /></td>
                  <td>{f.comments || "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
