import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOwnerMesses,
  fetchRegisteredCustomers,
  setActiveMess,
} from "../../messOwnerCustomersSlice";

const ViewRegisteredCustomers = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.logged.userid);
  const { messes, customers, activeMessId, loading, error } = useSelector(
    (state) => state.messOwnerCustomers
  );

  // Fetch owner messes on mount
  useEffect(() => {
    if (userId) dispatch(fetchOwnerMesses(userId));
  }, [dispatch, userId]);

  // Fetch customers whenever activeMessId changes
  useEffect(() => {
    if (activeMessId) dispatch(fetchRegisteredCustomers(activeMessId));
  }, [dispatch, activeMessId]);

  if (loading) return <p>Loading registered customers...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div>
      <h2>Registered Customers</h2>

      {/* Mess Tabs */}
      <div className="mb-3">
        {messes.length === 0 && <p>No messes found for this owner.</p>}
        {messes.map((mess) => (
          <button
            key={mess.messId}
            className={`btn me-2 ${
              activeMessId === mess.messId ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => dispatch(setActiveMess(mess.messId))}
          >
            {mess.messName}
          </button>
        ))}
      </div>

      {/* Customers Table */}
      {customers.length === 0 ? (
        <p>No customers registered for this mess.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Plan</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.subscriptionId}>
                <td>{c.user.fullName}</td>
                <td>{c.user.email}</td>
                <td>{c.user.phone}</td>
                <td>{c.plan.planName}</td>
                <td>{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewRegisteredCustomers;
