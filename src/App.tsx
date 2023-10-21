import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Dashboard from "./pages/dashboard";
import InfoOps from "./pages/InfoOps";
import InfoMovs from "./pages/InfoMovs";
import Balance from "./pages/Balance";
import AdminPanel from "./pages/AdminPanel";
import CashFlowPage from "./pages/CashFlow";
import GananciasPage from "./pages/GananciasPage";
import InfoPresDev from "./pages/InfoPrestDev";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/InfoOps" element={<InfoOps />} />
        <Route path="/InfoMovs" element={<InfoMovs />} />
        <Route path="/InfoPresDev" element={<InfoPresDev />} />
        <Route path="/Balance" element={<Balance />} />
        <Route path="/CashFlowPage" element={<CashFlowPage />} />
        <Route path="/GananciasPage" element={<GananciasPage />} />
        <Route path="/AdminPanel" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
