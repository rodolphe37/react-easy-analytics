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
      >
        <div className="consumer">
          <DashboardConsumer DEBUG_MODE={true}>
            <span style={{ color: "white" }}>DashBoard Consumer</span>
            <div /> <div /> <div /> <div /> <div /> <div /> <div /> <div />{" "}
            <div /> <div /> <div /> <div /> <div /> <div /> <div /> <div />{" "}
            <div /> <div /> <div /> <div /> <div />
          </DashboardConsumer>
        </div>
      </DashboardProvider>
    </div>
  );
};

export default Dashboard;
