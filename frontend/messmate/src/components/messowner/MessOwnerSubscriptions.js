import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubscriptions } from "../../subscriptionSlice";
import "../../styles/table.css";

export default function MessOwnerSubscriptions() {
  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.logged.user);

  // ✅ FALLBACK (VERY IMPORTANT)
  const messId = loggedUser?.messId || 1; // use real one when login works

  const { customers, loading, error } = useSelector(
    (state) => state.subscriptions
  );

  useEffect(() => {
    if (messId) {
      dispatch(fetchSubscriptions(messId));
    }
  }, [dispatch, messId]);

  if (loading) return <p>Loading subscribed customers...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="table-container">
      <h3>Subscribed Customers</h3>

      <table className="custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Plan</th>
            <th>Meals</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan="6">No subscribed customers found</td>
            </tr>
          ) : (
            customers.map((c) => (
              <tr key={c.subscriptionId}>
                <td>{c.userName}</td>
                <td>{c.planName}</td>
                <td>{c.mealInclusion}</td>
                <td>{c.startDate}</td>
                <td>{c.endDate}</td>
                <td>{c.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
