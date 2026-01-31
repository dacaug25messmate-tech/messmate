import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOwnerMesses,
  fetchRegisteredCustomers,
} from "../../messOwnerCustomersSlice";

const ViewRegisteredCustomers = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.logged.userid);

  const { messes, customers, loading, error } = useSelector(
    (state) => state.messOwnerCustomers
  );

  const [expandedMessId, setExpandedMessId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [mealType, setMealType] = useState("LUNCH");


  useEffect(() => {
    if (userId) {
      dispatch(fetchOwnerMesses(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (expandedMessId && selectedDate && mealType) {
      dispatch(
        fetchRegisteredCustomers(expandedMessId, selectedDate, mealType)
      );
    }
  }, [dispatch, expandedMessId, selectedDate, mealType]);

  if (loading) return <p>Loading registered customers...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div>
      <h2 className="mb-4">Registered Customers</h2>

      {/* FILTERS */}
      <div className="d-flex gap-3 mb-4">
        <input
          type="date"
          className="form-control w-auto"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <select
          className="form-select w-auto"
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
        >
          <option value="LUNCH">Lunch</option>
          <option value="DINNER">Dinner</option>
        </select>
      </div>

      {messes.length === 0 && <p>No messes found.</p>}

      {messes.map((mess) => (
        <div key={mess.messId} className="card mb-4 shadow-sm">
          {/* HEADER */}
          <div className="card-header d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0">{mess.messName}</h5>
              {expandedMessId === mess.messId && (
                <small className="text-muted">
                  Registered Customers: {customers.length}
                </small>
              )}
            </div>

            <button
              className="btn btn-primary btn-sm"
              onClick={() =>
                setExpandedMessId(
                  expandedMessId === mess.messId ? null : mess.messId
                )
              }
            >
              {expandedMessId === mess.messId
                ? "Hide Customers"
                : "View Customers"}
            </button>
          </div>

          {/* BODY */}
          {expandedMessId === mess.messId && (
            <div className="card-body">
              {customers.length === 0 ? (
                <p>No customers registered.</p>
              ) : (
                <table className="table table-bordered table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Customer Name</th>
                      <th>Phone</th>
                      <th>Meal Type</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((c, index) => (
                      <tr key={c.subscriptionId}>
                        <td>{index + 1}</td>
                        <td>{c.fullName}</td>
                        <td>{c.phone}</td>
                        <td>{c.mealType}</td>
                        <td>{c.startDate}</td>
                        <td>{c.endDate}</td>
                        <td>
                          <span
                            className={`badge ${
                              c.visitStatus
                                ? "bg-success"
                                : "bg-secondary"
                            }`}
                          >
                            {c.visitStatus ?? "NOT VISITED"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ViewRegisteredCustomers;
