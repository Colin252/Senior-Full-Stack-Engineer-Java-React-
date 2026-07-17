import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import StatusPage from "./pages/Status";
import ModulesPage from "./pages/Modules";
import SummaryPage from "./pages/Summary";

export default function App() {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/status" element={<StatusPage />} />
                    <Route path="/modules" element={<ModulesPage />} />
                    <Route path="/summary" element={<SummaryPage />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}
