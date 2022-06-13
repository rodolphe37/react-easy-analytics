import logo from "../logo.svg";
import useRealTimeHours from "../hooks/useRealTimeHours";
import useTodayDate from "../hooks/useTodayDate";
import AnalyticsConsumer from "../components/consumer/AnalyticsConsumer";

function HomeSite1() {
  const { time } = useRealTimeHours();
  const { LocalDate } = useTodayDate();

  return (
    <div className="App">
      <AnalyticsConsumer>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Date : {LocalDate}</p>
          <p> Time : {time}</p>
        </header>
      </AnalyticsConsumer>
    </div>
  );
}

export default HomeSite1;
