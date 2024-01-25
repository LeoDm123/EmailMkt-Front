import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import AdminDashboard from "./pages/admin/adminDashboard";
import AdminPanel from "./pages/admin/adminPanel";
import ClientDashboard from "./pages/client/clientDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/AdminPanel" element={<AdminPanel />} />
        <Route path="/ClientDashboard" element={<ClientDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
