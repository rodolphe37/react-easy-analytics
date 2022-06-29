import useDashboardProvider from "../../hooks/useDashboardProvider";
import GeolocationComponent from "../dashboardElements/GeolocationComponent";
import SiteNameComponent from "../dashboardElements/SiteNameComponent";
import UsersNumberComponent from "../dashboardElements/UsersNumberComponent";
import DebugModeProvider from "./DebugModeProvider";

const DashboardProvider = ({
  children,
  siteName,
  DEBUG_MODE,
  BASE_URL,
  GEO,
  USERS,
}) => {
  const { sitesList, usersIdList, sessionsUsersIdForCout } =
    useDashboardProvider({ siteName, DEBUG_MODE, BASE_URL });

  return (
    <div className="dashboard__consumer-container">
      <DebugModeProvider
        usersIdList={usersIdList}
        sessionsUsersIdForCout={sessionsUsersIdForCout}
        sitesList={sitesList}
        DEBUG_MODE={DEBUG_MODE}
      />
      {!DEBUG_MODE ? (
        <div>
          <SiteNameComponent siteName={siteName} sitesList={sitesList} />
          <UsersNumberComponent USERS={USERS} usersIdList={usersIdList} />
          <GeolocationComponent GEO={GEO} usersIdList={usersIdList} />
        </div>
      ) : (
        ""
      )}
      {children}
    </div>
  );
};

export default DashboardProvider;
