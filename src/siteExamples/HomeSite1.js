import logo from "../logo.svg";
import useRealTimeHours from "../hooks/useRealTimeHours";
import useTodayDate from "../hooks/useTodayDate";
import AnalyticsProvider from "../components/provider/AnalyticsProvider";
import AnalyticsConsumer from "../components/consumer/AnalyticsConsumer";

function HomeSite1() {
  const DEBUG_MODE = true;
  const BASE_URL = "https://b0utwv5a.directus.app/items";
  const { time } = useRealTimeHours();
  const { LocalDate } = useTodayDate();

  return (
    <div>
      <span>
        <AnalyticsProvider DEBUG_MODE={DEBUG_MODE} BASE_URL={BASE_URL}>
          <div className="App">
            <AnalyticsConsumer>
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Date : {LocalDate}</p>
                <p> Time : {time}</p>
              </header>
              <a href="/dashboard" target="new">
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
            </AnalyticsConsumer>
          </div>
        </AnalyticsProvider>
      </span>
    </div>
  );
}

export default HomeSite1;
