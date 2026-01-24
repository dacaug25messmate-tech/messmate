import "../../styles/dashboard.css";
import { FaUtensils, FaCalendarAlt, FaClipboardList, FaUserCheck, FaUsers, FaStar, FaPlusSquare, FaStore } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessOwnerFoodRequestForm from "../messowner/MessOwnerFoodRequestForm";
import { fetchSubCategories } from "../../subCategoriesSlice";

export default function MessOwnerDashboard() {
  const [activeModule, setActiveModule] = useState("Profile & Mess Info");
  const dispatch = useDispatch();

  // Get subcategories from Redux
  const { subCategories, loading: subCatLoading } = useSelector(
    (state) => state.subCategories
  );

  // Get logged-in user from Redux
  const messId = useSelector((state) => state.logged.messId);

console.log("MESS ID:", messId);

  useEffect(() => {
    dispatch(fetchSubCategories());
  }, [dispatch]);

  const items = [
    { label: "Profile & Mess Info", icon: <FaStore /> },
    { label: "Manage Daily Menu / Plans", icon: <FaUtensils /> },
    { label: "Manage Monthly Plans", icon: <FaCalendarAlt /> },
    { label: "Manage Orders", icon: <FaClipboardList /> },
    { label: "Mark Attendance (Visited)", icon: <FaUserCheck /> },
    { label: "View Registered Customers", icon: <FaUsers /> },
    { label: "View Ratings", icon: <FaStar /> },
    { label: "Request New Menu Item", icon: <FaPlusSquare /> },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h4>Mess Owner</h4>
        </div>
        <ul className="sidebar-list">
          {items.map((item, i) => (
            <li
              key={i}
              className={`sidebar-item ${activeModule === item.label ? "active" : ""}`}
              onClick={() => setActiveModule(item.label)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {activeModule === "Request New Menu Item" && (
          <>
            {subCatLoading ? (
              <p>Loading subcategories...</p>
            ) : (
              <MessOwnerFoodRequestForm subCategories={subCategories} messId={messId} />
            )}
          </>
        )}
        {activeModule !== "Request New Menu Item" && (
          <h2>{activeModule}</h2> // Placeholder for other modules
        )}
      </div>
    </div>
  );
}
