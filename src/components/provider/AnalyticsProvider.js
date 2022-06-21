import React, { useEffect, useRef } from "react";

import { useEffectOnce } from "../../hooks/useEffectOnce";
import useGeolocation from "../../hooks/useGeolocation";
import usePostDatas from "../../hooks/usePostDatas";
import useSessionNumbers from "../../hooks/useSessionNumbers";

const AnalyticsProvider = ({ children, BASE_URL, DEBUG_MODE }) => {
  const { postData } = usePostDatas({ BASE_URL, DEBUG_MODE });
  const { incrementCount } = useSessionNumbers();
  const { geoData, GetGeoData } = useGeolocation();

  let IsMounted = useRef(false);

  useEffect(() => {
    if (IsMounted.current && geoData === null) {
      try {
        GetGeoData();
      } catch (error) {
        console.error("Request failed:", error);
      }
    }
  }, [GetGeoData, geoData]);

  useEffect(() => {
    IsMounted.current = true;
    incrementCount();

    return () => {
      IsMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isSended = useRef(false);

  useEffect(() => {
    if (isSended.current) return;
    if (!isSended.current) {
      postData();
      isSended.current = true;
    }
  }, []);

  return (
    <div
      className="analytics__provider-container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
};

export default AnalyticsProvider;
