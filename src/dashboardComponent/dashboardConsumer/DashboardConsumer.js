import useDashboardConsumer from "../../hooks/useDashboardConsumer";
import DebugModeConsumer from "./DebugModeConsumer";

const DashboardConsumer = ({ children, DEBUG_MODE, BASE_URL }) => {
  const { pathDatas, finalArray, datas, filteredArr } = useDashboardConsumer({
    BASE_URL,
    DEBUG_MODE,
  });

  return (
    <div>
      {children}
      <DebugModeConsumer
        pathDatas={pathDatas}
        finalArray={finalArray}
        datas={datas}
        filteredArr={filteredArr}
        DEBUG_MODE={DEBUG_MODE}
      />
    </div>
  );
};

export default DashboardConsumer;
