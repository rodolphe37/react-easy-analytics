import DashboardConsumer from "./dashboardConsumer/DashboardConsumer";
import DashboardProvider from "./dashboardProvider/DashboardProvider";

const Dashboard = () => {
  const DEBUG_MODE = true;
  const BASE_URL = "https://b0utwv5a.directus.app/items";

  return (
    <div className="doashboardContent">
      <DashboardProvider
        DEBUG_MODE={DEBUG_MODE}
        BASE_URL={BASE_URL}
        siteName="My-Analytics-Module"
        GEO
        USERS
      >
        <div className="consumer">
          <DashboardConsumer BASE_URL={BASE_URL} DEBUG_MODE={DEBUG_MODE} />
        </div>
      </DashboardProvider>
    </div>
  );
};

export default Dashboard;
