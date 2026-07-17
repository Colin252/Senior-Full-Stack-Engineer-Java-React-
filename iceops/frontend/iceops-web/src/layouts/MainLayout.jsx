import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";

export default function MainLayout() {
  return (
    <div className="app-layout">

      <Sidebar />

      <div className="app-wrapper">

        <Navbar />

        <main className="main-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}