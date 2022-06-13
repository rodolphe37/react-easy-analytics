import AnalyticsProvider from "../components/provider/AnalyticsProvider";
import HomeSite1 from "./HomeSite1";

const IndexHome1 = () => {
  const DEBUG_MODE = true;
  const BASE_URL = "https://b0utwv5a.directus.app/items";

  return (
    <AnalyticsProvider
      siteName="My Analytics"
      DEBUG_MODE={DEBUG_MODE}
      BASE_URL={BASE_URL}
    >
      <HomeSite1 />
    </AnalyticsProvider>
  );
};

export default IndexHome1;
