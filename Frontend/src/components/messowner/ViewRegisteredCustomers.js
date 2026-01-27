import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../styles/dashboard.css";

export default function ViewRegisteredCustomers() {
  const messId = useSelector(state => state.logged.messId);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!messId) return;

    fetch(`http://localhost:2025/api/messowner/customers/${messId}`)
      .then(res => res.json())
      .then(data => {
        console.log("API RESPONSE:", data);
        setSubscriptions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [messId]);

  if (loading) return <p>Loading registered customers...</p>;

  return (
    <div className="dashboard-content">
      <h4 className="mb-3">Registered Customers</h4>

      {subscriptions.length === 0 ? (
        <p>No active customers found.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th>Username</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Plan ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {subscriptions.map((s, index) => (
              <tr key={s.subscriptionId}>
                <td>{index + 1}</td>
                <td>{s.user.fullName}</td>
                <td>{s.user.userName}</td>
                <td>{s.user.phone}</td>
                <td>{s.user.email}</td>
                <td>{s.plan.planId}</td>
                <td>{s.startDate}</td>
                <td>{s.endDate}</td>
                <td>
                  <span className="badge bg-success">
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
