
import "../../styles/messformdisplay.css";
import AddMessForm from "../../components/messowner/AddMessForm.jsx";
import MonthlyPlans from "./MonthlyPlanList.js";
import UploadMessPhoto from "../../components/messowner/UploadMessPhoto.jsx";
import EditProfileForm from "./EditprofileForm.jsx";
import { useEffect, useState } from "react";
import { messowner_url } from "../rest_endpoints.js";

export default function ProfileAndMessInfo() {
  const userId = localStorage.getItem("userid");

  const [data, setData] = useState(null);
  const [activeMenu] = useState("Profile & Mess Info");
  const [activeTab, setActiveTab] = useState("profile");

  const [myMesses, setMyMesses] = useState([]);
  const [selectedMess, setSelectedMess] = useState(null);

  // Load profile & mess data
  const loadProfile = () => {
    fetch(`${messowner_url}/profile/${userId}`)
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData(null));

    fetch(`${messowner_url}/messes/${userId}`)
      .then((res) => res.json())
      .then(setMyMesses)
      .catch(() => setMyMesses([]));
  };

  useEffect(() => {
    loadProfile();
  }, [userId]);

  // When add/edit mess is saved
  const handleSaved = () => {
    loadProfile();
    setActiveTab("mess");
  };

  // Delete mess
  const handleDeleteMess = (messId) => {
    if (!window.confirm("Are you sure you want to delete this mess?")) return;

    fetch(`${messowner_url}/mess/${messId}`, {
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

  // Edit mess
  const handleEditFromRow = (messId) => {
    fetch(`${messowner_url}/mess/details/${messId}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedMess(data);
        setActiveTab("edit");
      });
  };

  // View mess details
  const handleViewMess = (messId) => {
    fetch(`${messowner_url}/mess/details/${messId}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedMess(data);
        setActiveTab("messDetails");
      });
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
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
                onClick={() => {
                  if (!selectedMess) return alert("Select a mess first");
                  setActiveTab("addPhoto");
                }}
                className={activeTab === "addPhoto" ? "tab-active" : ""}
              >
                Add Photo
              </button>
            </div>

            {/* PROFILE VIEW */}
            {activeTab === "profile" && (
              <>
                <table className="profile-table">
                  <tbody>
                    <tr><th>Full Name</th><td>{data.fullName}</td></tr>
                    <tr><th>Username</th><td>{data.username}</td></tr>
                    <tr><th>Email</th><td>{data.email}</td></tr>
                    <tr><th>Phone</th><td>{data.phone}</td></tr>
                    <tr><th>Address</th><td>{data.address}</td></tr>
                  </tbody>
                </table>

                <button
                  style={{ marginTop: "15px" }}
                  onClick={() => setActiveTab("editProfile")}
                >
                  Edit Profile
                </button>
              </>
            )}

            {/* EDIT PROFILE (ADDED LOGIC) */}
            {activeTab === "editProfile" && (
              <EditProfileForm
                profileData={data}
                onCancel={() => setActiveTab("profile")}
                onSaved={() => {
                  loadProfile();
                  setActiveTab("profile");
                }}
              />
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

            {/* MESS DETAILS */}
            {activeTab === "messDetails" && selectedMess && (
              <div style={{ marginTop: "25px" }}>
                <h4>Mess Details</h4>
                <table className="profile-table">
                  <tbody>
                    <tr><th>Name</th><td>{selectedMess.messName}</td></tr>
                    <tr><th>Address</th><td>{selectedMess.messAddress}</td></tr>
                    <tr><th>Type</th><td>{selectedMess.messType}</td></tr>
                    <tr>
                      <th>Lunch</th>
                      <td>{selectedMess.lunchOpenTime} - {selectedMess.lunchCloseTime}</td>
                    </tr>
                    <tr>
                      <th>Dinner</th>
                      <td>{selectedMess.dinnerOpenTime} - {selectedMess.dinnerCloseTime}</td>
                    </tr>
                    <tr>
                      <th>Area</th>
                      <td>{selectedMess.areaId?.area_name || "N/A"}</td>
                    </tr>
                  </tbody>
                </table>

                <button onClick={() => setActiveTab("mess")}>
                  Back to List
                </button>
              </div>
            )}

            {/* ADD MESS */}
            {activeTab === "add" && (
              <AddMessForm userId={userId} mode="add" onSaved={handleSaved} />
            )}

            {/* EDIT MESS */}
            {activeTab === "edit" && selectedMess && (
              <AddMessForm
                userId={userId}
                mode="edit"
                messData={selectedMess}
                onSaved={handleSaved}
              />
            )}

            {/* UPLOAD PHOTO */}
            {activeTab === "addPhoto" && selectedMess && (
              <UploadMessPhoto
                messId={selectedMess.messId}
                onUploaded={() => {
                  alert("Photo uploaded successfully!");
                  setActiveTab("messDetails");
                }}
              />
            )}

          </div>
        )}

        {/* MONTHLY PLANS */}
        {activeMenu === "Manage Monthly Plans" && (
          <div className="dashboard-card">
            <MonthlyPlans messId={selectedMess?.messId} />
          </div>
        )}
      </div>
    </div>
  );
}

