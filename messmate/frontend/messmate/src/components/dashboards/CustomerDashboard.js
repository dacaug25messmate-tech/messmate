import "../../styles/dashboard.css";
import { FaUser, FaSearch, FaInfoCircle, FaClipboardList, FaStar } from "react-icons/fa";

export default function CustomerDashboard() {
  const items = [
    { label: "Profile Management", icon: <FaUser /> },
    { label: "Search Mess", icon: <FaSearch /> },
    { label: "View Mess Details", icon: <FaInfoCircle /> },
    { label: "Subscribe to Mess", icon: <FaClipboardList /> },
    { label: "My Subscriptions", icon: <FaClipboardList /> },
    { label: "Rate Mess", icon: <FaStar /> },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h4>Customer</h4>
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
