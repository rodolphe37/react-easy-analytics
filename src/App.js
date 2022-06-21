import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomeSite1 from "./siteExamples/HomeSite1";
import Dashboard from "./dashboardComponent/Dashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeSite1 />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
