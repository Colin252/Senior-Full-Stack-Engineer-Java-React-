import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";

export default function Layout({ children }) {
  return (
    <div className="app-layout">

      <Sidebar />

      <div className="app-wrapper">

        <Navbar />

        <main className="main-content">
          {children}
        </main>

      </div>

    </div>
  );
}