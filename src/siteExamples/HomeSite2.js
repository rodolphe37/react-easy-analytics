import logo from "../logo.svg";
import useRealTimeHours from "../hooks/useRealTimeHours";
import useTodayDate from "../hooks/useTodayDate";
import AnalyticsProvider from "../components/provider/AnalyticsProvider";
import AnalyticsConsumer from "../components/consumer/AnalyticsConsumer";

function HomeSite2() {
  const { time } = useRealTimeHours();
  const { LocalDate } = useTodayDate();

  return (
    <div>
      <span>
        <AnalyticsProvider DEBUG_MODE={true} siteId="My-Analytics-Module2">
          <div className="App2">
            <AnalyticsConsumer DEBUG_MODE={true}>
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Date : {LocalDate}</p>
                <p> Time : {time}</p>
              </header>
            </AnalyticsConsumer>
          </div>
        </AnalyticsProvider>
      </span>
    </div>
  );
}

export default HomeSite2;
