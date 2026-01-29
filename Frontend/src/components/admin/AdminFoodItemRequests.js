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

  if (loading) return <p>Loading food item requests...</p>;

  return (
    <div>
      <h2>Review Food Item Requests</h2>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Item</th>
            <th>Description</th>
            <th>Mess</th>
            <th>Sub Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No pending requests
              </td>
            </tr>
          ) : (
            requests.map((r) => (
              <tr key={r.requestId}>
                <td>{r.requestId}</td>
                <td>{r.itemName}</td>
                <td>{r.description}</td>
                <td>{r.messId?.messName}</td>
                <td>{r.subCategoryId?.subCategoryName}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() =>
                      dispatch(approveFoodRequest(r.requestId))
                    }
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      dispatch(rejectFoodRequest(r.requestId))
                    }
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
