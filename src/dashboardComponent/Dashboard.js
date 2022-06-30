import { useState } from "react";
import DashboardConsumer from "./dashboardConsumer/DashboardConsumer";
import DashboardProvider from "./dashboardProvider/DashboardProvider";

const Dashboard = () => {
  const [isDebugMode, setIsDebugMode] = useState(false);

  const DEBUG_MODE = isDebugMode;
  const BASE_URL = "https://b0utwv5a.directus.app/items";

  const handleDebugMode = () => {
    setIsDebugMode((isDebugMode) => !isDebugMode);
  };

  return (
    <div className="doashboardContent">
      <button onClick={handleDebugMode}>
        {isDebugMode ? "See classic Dashboard" : "See Debug mode Dashboard"}
      </button>
      <br />
      <DashboardProvider
        DEBUG_MODE={DEBUG_MODE}
        BASE_URL={BASE_URL}
        siteName="My-Analytics-Module"
        USERS
        GEO
      >
        <div className="consumer">
          <DashboardConsumer BASE_URL={BASE_URL} DEBUG_MODE={DEBUG_MODE} />
        </div>
      </DashboardProvider>
    </div>
  );
};

export default Dashboard;
