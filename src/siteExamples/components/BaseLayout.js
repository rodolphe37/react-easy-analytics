import AnalyticsConsumer from "../../components/consumer/AnalyticsConsumer";
import MenuAppComp from "./MenuAppComp";

const BaseLayout = ({ children }) => {
  const BASE_URL = "https://b0utwv5a.directus.app/items";

  return (
    <AnalyticsConsumer BASE_URL={BASE_URL}>
      <div className="base-layout__container">
        <MenuAppComp />
        {children}
      </div>
    </AnalyticsConsumer>
  );
};

export default BaseLayout;
