import logo from "../logo.svg";
import useRealTimeHours from "../hooks/useRealTimeHours";
import useTodayDate from "../hooks/useTodayDate";
import AnalyticsProvider from "../components/provider/AnalyticsProvider";
import BaseLayout from "./components/BaseLayout";

function HomeSite1() {
  const DEBUG_MODE = true;
  const BASE_URL = "https://b0utwv5a.directus.app/items";
  const { time } = useRealTimeHours();
  const { LocalDate } = useTodayDate();

  return (
    <BaseLayout>
      <span>
        <AnalyticsProvider
          DEBUG_MODE={DEBUG_MODE}
          BASE_URL={BASE_URL}
          siteName="My-Analytics-Module"
        >
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>Date : {LocalDate}</p>
              <p> Time : {time}</p>
            </header>
            <a href="/dashboard" target="new" style={{ color: "#61dafb" }}>
              Go to Dashboard <br />
              <br />
            </a>
            <q
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: 14,
              }}
            >
              Open devtool to see the console.
            </q>
          </div>
        </AnalyticsProvider>
      </span>
    </BaseLayout>
  );
}

export default HomeSite1;
