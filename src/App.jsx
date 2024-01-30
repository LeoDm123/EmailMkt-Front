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
        <Route path="/a/dashboard" element={<AdminDashboard />} />
        <Route path="/a/panel" element={<AdminPanel />} />
        <Route path="/c/dashboard" element={<ClientDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
