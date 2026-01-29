import React, { useEffect, useState } from "react";
import "../../styles/dashboard.css";
import MessForm from "./MessForm";
import MonthlyPlans from "./MonthlyPlans";

export default function ProfileAndMessInfo() {
  const userId = localStorage.getItem("userid");

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myMesses, setMyMesses] = useState([]);
  const [selectedMess, setSelectedMess] = useState(null);
  const [activeTab, setActiveTab] = useState("profile"); // profile, mess, add, edit, messDetails

  // Load profile & mess list
  const loadProfile = async () => {
    try {
      setLoading(true);
      const profileRes = await fetch(`http://localhost:2025/api/messowner/profile/${userId}`);
      const profileData = await profileRes.json();
      setProfile(profileData);

      const messRes = await fetch(`http://localhost:2025/api/messowner/messes/${userId}`);
      const messData = await messRes.json();
      setMyMesses(Array.isArray(messData) ? messData : []);
    } catch (err) {
      console.error(err);
      setProfile(null);
      setMyMesses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [userId]);

  // After add/edit
  const handleSaved = () => {
    loadProfile();
    setActiveTab("mess");
    setSelectedMess(null);
  };

  // Delete mess
  const handleDeleteMess = async (messId) => {
    if (!window.confirm("Are you sure you want to delete this mess?")) return;
    try {
      const res = await fetch(`http://localhost:2025/api/messowner/mess/${messId}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      alert("Mess deleted successfully");
      loadProfile();
      setSelectedMess(null);
    } catch {
      alert("Error deleting mess");
    }
  };

  // Edit mess
  const handleEditFromRow = async (messId) => {
    try {
      const res = await fetch(`http://localhost:2025/api/messowner/mess/details/${messId}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setSelectedMess(data);
      setActiveTab("edit");
    } catch {
      alert("Failed to load mess details");
    }
  };

  // View mess
  const handleViewMess = async (messId) => {
    try {
      const res = await fetch(`http://localhost:2025/api/messowner/mess/details/${messId}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setSelectedMess(data);
      setActiveTab("messDetails");
    } catch {
      alert("Failed to load mess details");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>Failed to load profile</p>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-main">
        <div className="dashboard-card">

          {/* TABS */}
          <div className="profile-tabs">
            <button onClick={() => setActiveTab("profile")} className={activeTab === "profile" ? "tab-active" : ""}>
              Mess Owner Profile
            </button>
            <button onClick={() => setActiveTab("mess")} className={activeTab === "mess" ? "tab-active" : ""}>
              Mess Information
            </button>
            <button onClick={() => { setSelectedMess(null); setActiveTab("add"); }} className={activeTab === "add" ? "tab-active" : ""}>
              Add Mess
            </button>
            <button onClick={() => alert("Add Photo feature not implemented yet")}>
              Add Photo
            </button>
          </div>

          {/* PROFILE */}
          {activeTab === "profile" && (
            <table className="profile-table">
              <tbody>
                <tr><th>Full Name</th><td>{profile.fullName}</td></tr>
                <tr><th>Username</th><td>{profile.username}</td></tr>
                <tr><th>Email</th><td>{profile.email}</td></tr>
                <tr><th>Phone</th><td>{profile.phone}</td></tr>
                <tr><th>Address</th><td>{profile.address}</td></tr>
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
                    <tr><td colSpan="3" style={{ textAlign: "center" }}>No mess added yet</td></tr>
                  )}
                  {myMesses.map((mess) => (
                    <tr key={mess.messId}>
                      <td>{mess.messName}</td>
                      <td>{mess.messAddress}</td>
                      <td>
                        <button onClick={() => handleViewMess(mess.messId)}>View</button>
                        <button style={{ marginLeft: "8px" }} onClick={() => handleEditFromRow(mess.messId)}>Edit</button>
                        <button style={{ marginLeft: "8px", color: "red" }} onClick={() => handleDeleteMess(mess.messId)}>Delete</button>
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
                  <tr><th>Lunch</th><td>{selectedMess.lunchTime}</td></tr>
                  <tr><th>Dinner</th><td>{selectedMess.dinnerTime}</td></tr>
                  <tr><th>Area</th><td>{selectedMess.areaName || "N/A"}</td></tr>
                </tbody>
              </table>

              <button onClick={() => setActiveTab("mess")}>Back to List</button>
              <hr />
              <h4>Monthly Plans</h4>
              <MonthlyPlans messId={selectedMess.messId} />
            </div>
          )}


          {/* ADD / EDIT */}
          {(activeTab === "add" || (activeTab === "edit" && selectedMess)) && (
            <MessForm
              userId={userId}
              mode={activeTab === "edit" ? "edit" : "add"}
              messData={selectedMess}
              onSaved={handleSaved}
              onCancel={() => setActiveTab("mess")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
