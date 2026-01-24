import "../styles/dashboard.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../adminUsersSlice";

export default function AdminViewUsers() {
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector(
    (state) => state.adminUsers
  );

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center mt-4">Loading users...</p>;
  }

  if (error) {
    return <p className="text-danger text-center mt-4">{error}</p>;
  }

  return (
    <div>
      <h2 className="mb-4">All Users</h2>

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
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No users found
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
                    <span className={`badge ${
                      u.status === "APPROVED" ? "bg-success" : "bg-warning"
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td>{u.roleId?.roleName}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
