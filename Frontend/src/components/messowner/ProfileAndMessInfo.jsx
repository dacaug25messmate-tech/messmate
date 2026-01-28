import "../../styles/dashboard.css";
import AddMessForm from "../../components/messowner/AddMessForm.jsx";
import MonthlyPlans from "../../components/messowner/MonthlyPlans"; // Assuming you have this component
import { useEffect, useState } from "react";

export default function ProfileAndMessInfo() {
  const userId = localStorage.getItem("userid");

  const [data, setData] = useState(null);
  const [activeMenu, setActiveMenu] = useState("Profile & Mess Info");
  const [activeTab, setActiveTab] = useState("profile");
  const [messExists, setMessExists] = useState(false);

  const [myMesses, setMyMesses] = useState([]);
  const [selectedMess, setSelectedMess] = useState(null);

//   // Sidebar menu items (you missed defining this array)
//   const items = [
//     { label: "Profile & Mess Info", icon: "👤" },
//     { label: "Manage Monthly Plans", icon: "📅" },
//     // add more if needed
//   ];

  // Load profile & mess data
  const loadProfile = () => {
    fetch(`http://localhost:2025/api/messowner/profile/${userId}`)
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData(null));

    fetch(`http://localhost:2025/api/messowner/mess/${userId}`)
      .then((res) => res.ok ? res.json() : null)
      .then((data) => setMessExists(!!data))
      .catch(() => setMessExists(false));

    fetch(`http://localhost:2025/api/messowner/messes/${userId}`)
      .then((res) => res.json())
      .then(setMyMesses)
      .catch(() => setMyMesses([]));
  };

  useEffect(() => {
    loadProfile();
  }, [userId]);

  // When add/edit form is saved
  const handleSaved = () => {
    loadProfile();
    setActiveTab("mess");
  };

  // Delete mess handler
  const handleDeleteMess = (messId) => {
    if (!window.confirm("Are you sure you want to delete this mess?")) return;

    fetch(`http://localhost:2025/api/messowner/mess/${messId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        alert("Mess deleted successfully");
        loadProfile();
        setSelectedMess(null);
      })
      .catch(() => alert("Error deleting mess"));
  };

  // Start adding new mess
  const handleAddFromRow = () => {
    setSelectedMess(null);
    setActiveTab("add");
  };

  // Edit mess from row
  const handleEditFromRow = (messId) => {
    fetch(`http://localhost:2025/api/messowner/mess/details/${messId}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedMess(data);
        setActiveTab("edit");
      });
  };

  // View mess details (NEW tab: messDetails)
  const handleViewMess = (messId) => {
    fetch(`http://localhost:2025/api/messowner/mess/details/${messId}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedMess(data);
        setActiveTab("messDetails");
      });
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      {/* <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h4>Mess Owner</h4>
        </div> */}

        {/* <ul className="sidebar-list">
          {items.map((item, i) => (
            <li
              key={i}
              className={`sidebar-item ${
                activeMenu === item.label ? "active" : ""
              }`}
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
        </ul> */}
      {/* </div> */}

      {/* MAIN CONTENT */}
      <div className="dashboard-main">
        {activeMenu === "Profile & Mess Info" && (
          <div className="dashboard-card">
            {/* TABS */}
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

              <button
                onClick={() => {
                  setSelectedMess(null);
                  setActiveTab("add");
                }}
                className={activeTab === "add" ? "tab-active" : ""}
              >
                Add Mess
              </button>

              <button
                onClick={() => alert("Add Photo feature not implemented yet")}
              >
                Add Photo
              </button>
            </div>

            {/* PROFILE */}
            {activeTab === "profile" && (
              <table className="profile-table">
                <tbody>
                  <tr>
                    <th>Full Name</th>
                    <td>{data.fullName}</td>
                  </tr>
                  <tr>
                    <th>Username</th>
                    <td>{data.username}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{data.email}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td>{data.phone}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>{data.address}</td>
                  </tr>
                </tbody>
              </table>
            )}

            {/* MESS LIST */}
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

                    {myMesses.map((mess) => (
                      <tr key={mess.messId}>
                        <td>{mess.messName}</td>
                        <td>{mess.messAddress}</td>
                        <td>
                          <button onClick={() => handleViewMess(mess.messId)}>
                            View
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
              </>
            )}

            {/* MESS DETAILS VIEW */}
            {activeTab === "messDetails" && selectedMess && (
              <div style={{ marginTop: "25px" }}>
                <h4>Mess Details</h4>
                <table className="profile-table">
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>{selectedMess.messName}</td>
                    </tr>
                    <tr>
                      <th>Address</th>
                      <td>{selectedMess.messAddress}</td>
                    </tr>
                    <tr>
                      <th>Type</th>
                      <td>{selectedMess.messType}</td>
                    </tr>
                    <tr>
                      <th>Lunch</th>
                      <td>
                        {selectedMess.lunchOpenTime} - {selectedMess.lunchCloseTime}
                      </td>
                    </tr>
                    <tr>
                      <th>Dinner</th>
                      <td>
                        {selectedMess.dinnerOpenTime} - {selectedMess.dinnerCloseTime}
                      </td>
                    </tr>
                    <tr>
                      <th>Area</th>
                      <td>{selectedMess.areaId?.area_name || "N/A"}</td>
                    </tr>
                  </tbody>
                </table>
                <button onClick={() => setActiveTab("mess")}>Back to List</button>
              </div>
            )}

            {/* ADD FORM */}
            {activeTab === "add" && (
              <AddMessForm userId={userId} mode="add" onSaved={handleSaved} />
            )}

            {/* EDIT FORM */}
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

        {/* Manage Monthly Plans Tab */}
        {activeMenu === "Manage Monthly Plans" && (
          <div className="dashboard-card">
            <MonthlyPlans messId={selectedMess?.messId} />
          </div>
        )}
      </div>
    </div>
  );
}
