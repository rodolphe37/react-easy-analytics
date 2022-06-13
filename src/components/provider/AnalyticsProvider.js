import React, { useEffect, useRef } from "react";
import useControlUserId from "../../hooks/useControlUserId";
import { useEffectOnce } from "../../hooks/useEffectOnce";
import useGeolocation from "../../hooks/useGeolocation";
import useGetData from "../../hooks/useGetDatas";
// import usePostDatas from "../../hooks/usePostDatas";
import useSessionNumbers from "../../hooks/useSessionNumbers";
import useDebugMode from "../../utils/useDebugMode";

const AnalyticsProvider = ({ children, BASE_URL, DEBUG_MODE, siteName }) => {
  // const { SendToServer } = usePostDatas({ BASE_URL, DEBUG_MODE });
  const { sessionNumbers, incrementCount, userSessionObject } =
    useSessionNumbers();
  const { providerDebugConsoles } = useDebugMode({ BASE_URL, siteName });
  const { geoData, GetGeoData } = useGeolocation();
  const { datas, getData } = useGetData({ BASE_URL });
  const { UserWithId } = useControlUserId();

  let IsMounted = useRef(false);

  useEffect(() => {
    IsMounted.current = true;
    incrementCount();

    return () => {
      IsMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffectOnce(() => {
    if (geoData === null) {
      try {
        GetGeoData();
        getData();
      } catch (error) {
        console.error("Request failed:", error);
      }
    }
  }, [GetGeoData, getData, geoData]);

  useEffect(() => {
    if (!IsMounted.current) {
      return;
    }
    IsMounted.current = true;
    if (IsMounted.current && DEBUG_MODE) {
      if (geoData !== null && datas.length > 0 && UserWithId !== "") {
        providerDebugConsoles();
        IsMounted.current = false;
      }
    }
  }, [
    geoData,
    datas,
    UserWithId,
    siteName,
    sessionNumbers,
    userSessionObject,
    DEBUG_MODE,
    providerDebugConsoles,
  ]);

  const handleResetAll = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div
      className="analytics__provider-container"
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <button onClick={handleResetAll}>RESET</button>
      {children}
    </div>
  );
};

export default AnalyticsProvider;
