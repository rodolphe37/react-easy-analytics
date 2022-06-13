import DashboardConsumer from "./dashboardConsumer/DashboardConsumer";
import DashboardProvider from "./dashboardProvider/DashboardProvider";

const Dashboard = () => {
  const DEBUG_MODE = true;
  const BASE_URL = "https://b0utwv5a.directus.app/items";

  return (
    <div>
      <DashboardProvider
        DEBUG_MODE={DEBUG_MODE}
        BASE_URL={BASE_URL}
        siteName="My-Analytics-Module"
      >
        <div>
          <DashboardConsumer DEBUG_MODE={true}>
            <header
              className="Dashboard-header"
              style={{ color: "white", fontSize: 22 }}
            >
              Dashboard
            </header>
          </DashboardConsumer>
        </div>
      </DashboardProvider>
    </div>
  );
};

export default Dashboard;