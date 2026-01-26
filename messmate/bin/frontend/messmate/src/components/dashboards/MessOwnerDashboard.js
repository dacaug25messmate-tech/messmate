import "../../styles/dashboard.css";
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
            <li key={i} className="sidebar-item">
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
