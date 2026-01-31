import "../../styles/dashboard.css";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaUser,
  FaSearch,
  FaClipboardList
} from "react-icons/fa";

export default function CustomerDashboard() {
  // Sidebar items with paths
  const items = [
    { label: "Profile Management", icon: <FaUser />, path: "profile" },
    { label: "Search Mess", icon: <FaSearch />, path: "search-mess" },
    { label: "My Subscriptions", icon: <FaClipboardList />, path: "my-subscriptions" },
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
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "sidebar-item active" : "sidebar-item"
              }
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </NavLink>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        <Outlet />
      </div>
    </div>
  );
}