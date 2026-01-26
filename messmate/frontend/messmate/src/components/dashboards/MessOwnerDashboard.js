import "../../styles/dashboard.css";
import AddMessForm from "../../components/messowner/AddMessForm.jsx";
import { useEffect, useState } from "react";
import {
  FaUtensils,
  FaCalendarAlt,
  FaClipboardList,
  FaUserCheck,
  FaUsers,
  FaStar,
  FaPlusSquare,
  FaStore
} from "react-icons/fa";

export default function MessOwnerDashboard() {

  const userId = localStorage.getItem("userid");

  const [data, setData] = useState(null);
  const [activeMenu, setActiveMenu] = useState("Profile & Mess Info");
  const [activeTab, setActiveTab] = useState("profile");
  const [messExists, setMessExists] = useState(false);

  const [allMesses, setAllMesses] = useState([]);

  // 🔹 MY MESSES
  const [myMesses, setMyMesses] = useState([]);
  const [selectedMess, setSelectedMess] = useState(null);

  // ---------------- LOAD PROFILE ----------------
  const loadProfile = () => {
    fetch(`http://localhost:2025/api/messowner/profile/${userId}`)
      .then(res => res.json())
      .then(setData);

    fetch(`http://localhost:2025/api/messowner/mess/${userId}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => setMessExists(!!data))
      .catch(() => setMessExists(false));
  };

  useEffect(() => {
    loadProfile();

    // 🔹 Load all users messes
    fetch(`http://localhost:2025/api/messowner/all-messes`)
      .then(res => res.json())
      .then(setAllMesses)
      .catch(() => setAllMesses([]));

    // 🔹 Load my messes
    fetch(`http://localhost:2025/api/messowner/messes/${userId}`)
      .then(res => res.json())
      .then(setMyMesses)
      .catch(() => setMyMesses([]));

  }, [userId]);

  const handleSaved = () => {
    loadProfile();
    fetch(`http://localhost:2025/api/messowner/messes/${userId}`)
      .then(res => res.json())
      .then(setMyMesses);
    setActiveTab("mess");
  };

  // ---------------- DELETE ----------------
  const handleDeleteMess = (messId) => {
    if (!window.confirm("Are you sure you want to delete this mess?")) return;

    fetch(`http://localhost:2025/api/messowner/mess/${messId}`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) throw new Error();
        alert("Mess deleted successfully");

        fetch(`http://localhost:2025/api/messowner/messes/${userId}`)
          .then(res => res.json())
          .then(setMyMesses);

        setSelectedMess(null);
      })
      .catch(() => alert("Error deleting mess"));
  };

  // ---------------- ADD FROM ROW ----------------
  const handleAddFromRow = () => {
    setSelectedMess(null);
    setActiveTab("add");
  };

  // ---------------- EDIT FROM ROW ----------------
  const handleEditFromRow = (messId) => {
    fetch(`http://localhost:2025/api/messowner/mess/details/${messId}`)
      .then(res => res.json())
      .then(data => {
        setSelectedMess(data);
        setActiveTab("edit");
      });
  };

  const items = [
    { label: "Profile & Mess Info", icon: <FaStore /> },
    { label: "All Users Messes", icon: <FaUsers /> },
    { label: "Manage Daily Menu / Plans", icon: <FaUtensils /> },
    { label: "Manage Monthly Plans", icon: <FaCalendarAlt /> },
    { label: "Manage Orders", icon: <FaClipboardList /> },
    { label: "Mark Attendance (Visited)", icon: <FaUserCheck /> },
    { label: "View Registered Customers", icon: <FaUsers /> },
    { label: "View Ratings", icon: <FaStar /> },
    { label: "Request New Menu Item", icon: <FaPlusSquare /> }
  ];

  if (!data) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">

      {/* ---------------- SIDEBAR ---------------- */}
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h4>Mess Owner</h4>
        </div>

        <ul className="sidebar-list">
          {items.map((item, i) => (
            <li
              key={i}
              className={`sidebar-item ${activeMenu === item.label ? "active" : ""}`}
              onClick={() => {
                setActiveMenu(item.label);
                setActiveTab("profile");
                setSelectedMess(null);
              }}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <div className="dashboard-main">

        {activeMenu === "Profile & Mess Info" && (
          <div className="dashboard-card">

            {/* ---------- TABS ---------- */}
            <div className="profile-tabs">
              <button
                onClick={() => setActiveTab("profile")}
                className={activeTab === "profile" ? "tab-active" : ""}
              >
                Mess Owner Profile
              </button>

              <button
                onClick={() => setActiveTab("mess")}
                className={activeTab === "mess" ? "tab-active" : ""}
              >
                Mess Information
              </button>

              {/* <button
                onClick={() => setActiveTab("add")}
                className={activeTab === "add" ? "tab-active" : ""}
              >
                Add Mess
              </button>

              {messExists && (
                <button
                  onClick={() => setActiveTab("edit")}
                  className={activeTab === "edit" ? "tab-active" : ""}
                >
                  Edit Mess
                </button>
              )} */}
            </div>

            {/* ---------- PROFILE ---------- */}
            {activeTab === "profile" && (
              <table className="profile-table">
                <tbody>
                  <tr><th>Full Name</th><td>{data.fullName}</td></tr>
                  <tr><th>Username</th><td>{data.username}</td></tr>
                  <tr><th>Email</th><td>{data.email}</td></tr>
                  <tr><th>Phone</th><td>{data.phone}</td></tr>
                  <tr><th>Address</th><td>{data.address}</td></tr>
                </tbody>
              </table>
            )}

            {/* ---------- MESS INFORMATION ---------- */}
            {activeTab === "mess" && (
              <>
                <h3>My Messes</h3>

                <table className="profile-table">
                  <thead>
                    <tr>
                      <th>Mess Name</th>
                      <th>Address</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myMesses.length === 0 && (
                      <tr>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                          No mess added yet
                        </td>
                      </tr>
                    )}

                    {myMesses.map(mess => (
                      <tr key={mess.messId}>
                        <td>{mess.messName}</td>
                        <td>{mess.messAddress}</td>
                        <td>
                          <button
                            onClick={() => {
                              fetch(`http://localhost:2025/api/messowner/mess/details/${mess.messId}`)
                                .then(res => res.json())
                                .then(setSelectedMess);
                            }}
                          >
                            View
                          </button>

                          <button
                            style={{ marginLeft: "8px" }}
                            onClick={handleAddFromRow}
                          >
                            Add
                          </button>

                          <button
                            style={{ marginLeft: "8px" }}
                            onClick={() => handleEditFromRow(mess.messId)}
                          >
                            Edit
                          </button>

                          <button
                            style={{ marginLeft: "8px", color: "red" }}
                            onClick={() => handleDeleteMess(mess.messId)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {selectedMess && (
                  <div style={{ marginTop: "25px" }}>
                    <h4>Mess Details</h4>
                    <table className="profile-table">
                      <tbody>
                        <tr><th>Name</th><td>{selectedMess.messName}</td></tr>
                        <tr><th>Address</th><td>{selectedMess.messAddress}</td></tr>
                        <tr><th>Type</th><td>{selectedMess.messType}</td></tr>
                        <tr><th>Lunch</th><td>{selectedMess.lunchOpenTime} - {selectedMess.lunchCloseTime}</td></tr>
                        <tr><th>Dinner</th><td>{selectedMess.dinnerOpenTime} - {selectedMess.dinnerCloseTime}</td></tr>
                        <tr><th>Area</th><td>{selectedMess.areaId?.area_name}</td></tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}

            {/* ---------- ADD / EDIT ---------- */}
            {activeTab === "add" && (
              <AddMessForm userId={userId} mode="add" onSaved={handleSaved} />
            )}

            {activeTab === "edit" && (
              <AddMessForm
                userId={userId}
                mode="edit"
                messData={selectedMess}
                onSaved={handleSaved}
              />
            )}

          </div>
        )}

      </div>
    </div>
  );
}
