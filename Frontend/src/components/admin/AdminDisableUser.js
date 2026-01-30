import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdminDisableUser() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:2027/api/admin/viewusers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setUsers(data);
    } catch {
      toast.error("Unable to load users 😕");
    }
  };

  /* ================= ACTIONS ================= */
  const disableUser = async (id) => {
    try {
      await fetch(`http://localhost:2027/api/admin/disable/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.error("🚫 User disabled");
      fetchUsers();
    } catch {
      toast.error("Action failed");
    }
  };

  const enableUser = async (id) => {
    try {
      await fetch(`http://localhost:2027/api/admin/enable/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("✅ User enabled");
      fetchUsers();
    } catch {
      toast.error("Action failed");
    }
  };

  /* ================= FILTER LOGIC ================= */
  const filteredUsers = users
    .filter((u) =>
      `${u.fullName} ${u.userName} ${u.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((u) => {
      if (filter === "ACTIVE") return u.activeStatus === "ACTIVE";
      if (filter === "INACTIVE") return u.activeStatus === "INACTIVE";
      return true;
    });

  /* ================= UI ================= */
  return (
    <div className="container-fluid px-3">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">User Access Control</h4>
          <p className="text-muted small mb-0">
            Enable or disable users instantly
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control rounded-pill px-4"
            placeholder="🔍 Search by name, username or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-select rounded-pill"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="ALL">All Users</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Disabled</option>
          </select>
        </div>
      </div>

      {/* Card */}
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body p-4">

          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                <th>User</th>
                <th>Contact</th>
                <th>Status</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.userid}>
                  <td>
                    <div className="fw-semibold">{user.fullName}</div>
                    <div className="text-muted small">@{user.userName}</div>
                  </td>

                  <td>
                    <div className="small">{user.email}</div>
                    <div className="text-muted small">{user.phone}</div>
                  </td>

                  <td>
                    {user.activeStatus === "ACTIVE" ? (
                      <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">
                        ACTIVE
                      </span>
                    ) : (
                      <span className="badge bg-danger-subtle text-danger px-3 py-2 rounded-pill">
                        DISABLED
                      </span>
                    )}
                  </td>

                  <td className="text-end">
                    {user.activeStatus === "ACTIVE" ? (
                      <button
                        className="btn btn-outline-danger btn-sm rounded-pill px-3"
                        onClick={() => disableUser(user.userid)}
                      >
                        Disable
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-success btn-sm rounded-pill px-3"
                        onClick={() => enableUser(user.userid)}
                      >
                        Enable
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="text-center text-muted py-4">
              No users found 😶
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
