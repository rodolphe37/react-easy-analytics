import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomeSite1 from "./siteExamples/HomeSite1";
import Dashboard from "./dashboardComponent/Dashboard";
import Page3 from "./siteExamples/components/Page3";
import Page2 from "./siteExamples/components/Page2";
import Page1 from "./siteExamples/components/Page1";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeSite1 />} />
        <Route path="/page-1" element={<Page1 />} />
        <Route path="/page-2" element={<Page2 />} />
        <Route path="/page-3" element={<Page3 />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
