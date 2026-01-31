import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFoodRequests,
  approveFoodRequest,
  rejectFoodRequest
} from "../../foodItemRequestsSlice";

export default function AdminFoodItemRequests() {
  const dispatch = useDispatch();

  const { requests, loading } = useSelector(
    (state) => state.foodRequests
  );

  useEffect(() => {
    dispatch(fetchFoodRequests());
  }, [dispatch]);

  if (loading)
    return (
      <div className="text-center py-5 text-muted">
        Loading food item requests…
      </div>
    );

  return (
    <div className="container-fluid px-3">

      {/* Header */}
      <div className="mb-4">
        <h4 className="fw-bold mb-1">Review Food Item Requests</h4>
        <p className="text-muted small mb-0">
          Approve or reject food items requested by mess owners
        </p>
      </div>

      {/* Card */}
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body p-4">

          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-light">
                <tr>
                  <th style={{ width: "5%" }}>#</th>
                  <th style={{ width: "15%" }}>Item</th>
                  <th>Description</th>
                  <th style={{ width: "15%" }}>Mess Owner</th>
                  <th style={{ width: "15%" }}>Sub Category</th>
                  <th className="text-end" style={{ width: "15%" }}>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      No pending requests 😶
                    </td>
                  </tr>
                ) : (
                  requests.map((r) => (
                    <tr key={r.requestId}>
                      <td className="text-muted">
                        {r.requestId}
                      </td>

                      <td>
                        <div className="fw-semibold">
                          {r.itemName}
                        </div>
                      </td>

                      <td className="text-muted small">
                        {r.description}
                      </td>

                      <td>
                        {r.messId?.ownerName || "-"}
                      </td>

                      <td>
                        <span className="badge bg-secondary-subtle text-secondary rounded-pill px-3 py-2">
                          {r.subCategoryId?.subCategoryName || "-"}
                        </span>
                      </td>

                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-2">
                          <button
                            className="btn btn-outline-success btn-sm rounded-pill px-3"
                            onClick={() =>
                              dispatch(
                                approveFoodRequest(r.requestId)
                              )
                            }
                          >
                            Approve
                          </button>

                          <button
                            className="btn btn-outline-danger btn-sm rounded-pill px-3"
                            onClick={() =>
                              dispatch(
                                rejectFoodRequest(r.requestId)
                              )
                            }
                          >
                            Reject
                          </button>
                        </div>
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
