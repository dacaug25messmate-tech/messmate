import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRatings } from "../../ratingSlice";
import "../../styles/table.css";

export default function MessOwnerRatings() {
  const dispatch = useDispatch();

  
  const userId = useSelector(
    (state) => state.logged.user?.userid
  );

  const { ratings, status, error } = useSelector(
    (state) => state.ratings
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchRatings(userId));
    }
  }, [dispatch, userId]);

  if (status === "loading") return <p>Loading ratings...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="table-container">
      <h2>Mess Ratings</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Mess Name</th>
            <th>Customer Name</th>
            <th>Rating</th>
            <th>Comment</th>
          </tr>
        </thead>

        <tbody>
          {ratings.length === 0 ? (
            <tr>
              <td colSpan="4">No Ratings Available</td>
            </tr>
          ) : (
            ratings.map((r) => (
              <tr key={r.ratingId}>
                <td>{r.mess?.messName}</td>
                <td>{r.user?.fullName}</td>
                <td>{"⭐".repeat(r.rating)}</td>
                <td>{r.comments}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
