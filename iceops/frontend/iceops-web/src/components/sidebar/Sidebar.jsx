import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const menuItems = [
  { path: "/", label: "Dashboard", end: true },
  { path: "/organizations", label: "Organizations" },
  { path: "/users", label: "Users" },
  { path: "/products", label: "Products" },
  { path: "/orders", label: "Orders" },
  { path: "/payments", label: "Payments" },
  { path: "/inventory", label: "Inventory" },
  { path: "/accounting", label: "Accounting" },
  { path: "/finance", label: "Finance" },
  { path: "/analytics", label: "Analytics" },
  { path: "/reports", label: "Reports" },
  { path: "/settings", label: "Settings" }
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">I</div>

        <div>
          <strong>ICEOPS</strong>
          <small>ERP Platform</small>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}