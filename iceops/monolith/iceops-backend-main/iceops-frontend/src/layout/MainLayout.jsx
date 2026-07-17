import Sidebar from "./Sidebar";
import "../styles/Sidebar.css";
export default function MainLayout({ children }) {
    return (
        <div className="layout">
            <Sidebar />
            <div className="content">
                {children}
            </div>
        </div>
    );
}
