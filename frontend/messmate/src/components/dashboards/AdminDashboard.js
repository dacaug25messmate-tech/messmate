import "../../styles/dashboard.css";
// Importing icons from Font Awesome (fa) and Material Design (md)
import { 
  FaUserCheck, 
  FaUsers, 
  FaUserSlash, 
  FaUtensils, 
  FaClipboardCheck, 
  FaCommentDots, 
  FaUserPlus 
} from "react-icons/fa";

export default function AdminDashboard() {
  const items = [
    { label: "Check Registration Requests", icon: <FaUserPlus /> },
    { label: "Approve / Reject Users", icon: <FaUserCheck /> },
    { label: "View All Users", icon: <FaUsers /> },
    { label: "Disable User", icon: <FaUserSlash /> },
    { label: "Manage Menu Structure", icon: <FaUtensils /> },
    { label: "Review Menu Item Requests", icon: <FaClipboardCheck /> },
    { label: "View Feedback", icon: <FaCommentDots /> },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h4>Admin</h4>
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