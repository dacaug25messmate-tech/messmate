import "../../styles/dashboard.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPendingUsers,
  approveUser,
  rejectUser
} from "../../adminPendingUsersSlice";

export default function AdminPendingUsers() {
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector(
    (state) => state.adminPendingUsers
  );

  useEffect(() => {
    dispatch(fetchPendingUsers());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center py-5 text-muted">
        Loading pending requests…
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-danger text-center mt-4">
        {error}
      </p>
    );
  }

  return (
    <div className="container-fluid px-3">

      {/* Header (same pattern everywhere) */}
      <div className="mb-4">
        <h4 className="fw-bold mb-1">
          Registration Requests
        </h4>
        <p className="text-muted small mb-0">
          Review and approve new user registrations
        </p>
      </div>

      {/* Card */}
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body p-4">

          <div className="table-responsive">
            <table className="table align-middle">

              {/* Light header */}
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Role</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center text-muted py-4"
                    >
                      No pending registration requests 😶
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.userid}>

                      <td className="text-muted">
                        {u.userid}
                      </td>

                      <td>
                        <div className="fw-semibold">
                          {u.userName}
                        </div>
                      </td>

                      <td>
                        <div className="small">
                          {u.email}
                        </div>
                        <div className="text-muted small">
                          {u.phone}
                        </div>
                      </td>

                      <td>
                        <span className="badge bg-warning-subtle text-warning px-3 py-2 rounded-pill">
                          {u.status}
                        </span>
                      </td>

                      <td>
                        <span className="badge bg-secondary-subtle text-secondary px-3 py-2 rounded-pill">
                          {u.roleId?.roleName}
                        </span>
                      </td>

                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-2">
                          <button
                            className="btn btn-outline-success btn-sm rounded-pill px-3"
                            onClick={() =>
                              dispatch(approveUser(u.userid))
                            }
                          >
                            Approve
                          </button>

                          <button
                            className="btn btn-outline-danger btn-sm rounded-pill px-3"
                            onClick={() =>
                              dispatch(rejectUser(u.userid))
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
