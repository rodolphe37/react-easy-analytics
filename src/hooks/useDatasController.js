import { useCallback, useEffect, useState } from "react";

const useDatasController = ({ userSessionObject }) => {
  const [analyticsData, setAnalyticsData] = useState([]);

  const getAllInfos = useCallback(() => {
    setAnalyticsData(userSessionObject);
  }, [userSessionObject]);

  useEffect(() => {
    if (userSessionObject.length > 0 && analyticsData.length === 0) {
      getAllInfos();
    }
  }, [userSessionObject, getAllInfos, analyticsData]);

  return [analyticsData];
};

export default useDatasController;
