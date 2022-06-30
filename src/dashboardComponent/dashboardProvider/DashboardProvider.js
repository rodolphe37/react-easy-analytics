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
          <br />
          <hr style={{ width: "100%" }} />
          <br />
          <UsersNumberComponent USERS={USERS} usersIdList={usersIdList} />
          <br />
          <hr style={{ width: "100%" }} />
          <br />
          <span
            style={{
              fontSize: 20,
              color: "orange",
              fontWeight: "bold",
              padding: "1rem",
              width: "90%",
              paddingTop: "1rem",
              paddingBottom: "1.8rem",
            }}
          >
            {" "}
            Users Position{" "}
          </span>
          <br />
          <span className="App-link" style={{ fontSize: 12 }}>
            If two users have same position, there are a same cursor
          </span>
          <GeolocationComponent GEO={GEO} usersIdList={usersIdList} />
          <br />
          <hr style={{ width: "100%" }} />
          <br />
        </div>
      ) : (
        ""
      )}
      {children}
    </div>
  );
};

export default DashboardProvider;
