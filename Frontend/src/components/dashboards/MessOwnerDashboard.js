import "../../styles/dashboard.css";
import { NavLink, Outlet } from "react-router-dom";
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
    { label: "Profile & Mess Info", icon: <FaStore />, path: "profile" },
    { label: "Manage Daily Menu / Plans", icon: <FaUtensils />, path: "menu" },
    { label: "Manage Monthly Plans", icon: <FaCalendarAlt />, path: "plans" },
    { label: "Manage Orders", icon: <FaClipboardList />, path: "orders" },
    { label: "Mark Attendance", icon: <FaUserCheck />, path: "attendance" },
    { label: "View Registered Customers", icon: <FaUsers />, path: "customers" },
    { label: "View Ratings", icon: <FaStar />, path: "ratings" }, // ✅ updated path
    { label: "Request New Menu Item", icon: <FaPlusSquare />, path: "request-menu" }
  ];

  return (
    <div className="dashboard-container">

    
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h4>Mess Owner</h4>
        </div>

        <ul className="sidebar-list">
          {items.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "sidebar-item active" : "sidebar-item"
                }
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

     
      <div className="dashboard-main">
        <Outlet />
      </div>

    </div>
  );
}
