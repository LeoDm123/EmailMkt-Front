import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Dashboard from "./pages/dashboard";
import Informacion from "./pages/Informacion";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/informacion" element={<Informacion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
