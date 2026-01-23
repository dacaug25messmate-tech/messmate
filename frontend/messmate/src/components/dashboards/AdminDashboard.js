import "../../styles/dashboard.css";
import { NavLink, Outlet } from "react-router-dom";

import {
  FaUserPlus,
  FaUsers,
  FaUserSlash,
  FaUtensils,
  FaClipboardCheck,
  FaCommentDots
} from "react-icons/fa";

export default function AdminDashboard() {

  const items = [
    {
      label: "Check Registration Requests",
      icon: <FaUserPlus />,
      path: "pendingUsers"
    },
    {
      label: "View All Users",
      icon: <FaUsers />,
      path: "viewusers"
    },
    {
      label: "Disable User",
      icon: <FaUserSlash />,
      path: "disable-user"
    },
    {
      label: "Manage Menu Structure",
      icon: <FaUtensils />,
      path: "menu"
    },
    {
      label: "Review Menu Item Requests",
      icon: <FaClipboardCheck />,
      path: "menu-requests"
    },
    {
      label: "View Feedback",
      icon: <FaCommentDots />,
      path: "feedback"
    }
  ];

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h4>Admin Panel</h4>
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
              <span>{item.label}</span>
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
