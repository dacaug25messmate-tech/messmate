import "../styles/dashboard.css";
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
    return <p className="text-center mt-4">Loading pending requests...</p>;
  }

  if (error) {
    return <p className="text-danger text-center mt-4">{error}</p>;
  }

  return (
    <div>
      <h2 className="mb-4">Check Registration Requests</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Role</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No pending registration requests
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.userid}>
                  <td>{u.userid}</td>
                  <td>{u.userName}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>
                    <span className="badge bg-warning">
                      {u.status}
                    </span>
                  </td>
                  <td>{u.roleId?.roleName}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => dispatch(approveUser(u.userid))}
                    >
                      Approve
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => dispatch(rejectUser(u.userid))}
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
    </div>
  );
}
