import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexHome1 from "./siteExamples/IndexHome1";
import Dashboard from "./components/dashboardComponent/Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<IndexHome1 />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
