import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Dashboard from "./pages/dashboard";
import InfoOps from "./pages/InfoOps";
import InfoMovs from "./pages/InfoMovs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/InfoOps" element={<InfoOps />} />
        <Route path="/InfoMovs" element={<InfoMovs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
