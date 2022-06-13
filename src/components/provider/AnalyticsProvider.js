import React, { useEffect, useRef } from "react";
import useControlUserId from "../../hooks/useControlUserId";
import { useEffectOnce } from "../../hooks/useEffectOnce";
import useGeolocation from "../../hooks/useGeolocation";
import useGetData from "../../hooks/useGetDatas";
import usePostDatas from "../../hooks/usePostDatas";
import useSessionNumbers from "../../hooks/useSessionNumbers";
import useDebugMode from "../../utils/useDebugMode";

const AnalyticsProvider = ({ children, BASE_URL, DEBUG_MODE, siteName }) => {
  const { SendToServer } = usePostDatas({ BASE_URL, DEBUG_MODE, siteName });
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
    console.log(datas);
  }, [datas]);

  useEffect(() => {
    if (!IsMounted.current) {
      return;
    }
    IsMounted.current = true;
    if (IsMounted.current && datas.length === 0) {
      SendToServer();
    }
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
    SendToServer,
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
      {DEBUG_MODE ? (
        <div
          style={{
            position: "absolute",
            zIndex: 8,
            fontSize: 14,
            top: "10px",
            width: "90%",
            left: "1.7rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            border: "6px solid rgba(255,255,255,0.98)",
            background: "#000",
            paddingBottom: 10,
          }}
        >
          <br />
          <button onClick={handleResetAll}>Reset all</button>
          <br />
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <div style={{ border: "1px solid white", padding: 7 }}>
              {/* <span
                  style={{
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  Users number:
                  <span className="App-link">{usersIdList?.length}</span>
                </span> */}

              <span
                style={{
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                User Id from localStorage:
                <span className="App-link">{UserWithId}</span>
              </span>
            </div>
            <div style={{ border: "1px solid white", padding: 7 }}>
              <span
                style={{
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                Site Name :<span className="App-link">{siteName}</span>
              </span>
            </div>
            {geoData && (
              <div style={{ border: "1px solid white", padding: 7 }}>
                <span
                  style={{
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  latitude:
                  <span className="App-link">{geoData.ip?.latitude}</span>
                  longitude:
                  <span className="App-link">{geoData.ip?.longitude}</span>
                </span>
              </div>
            )}
          </div>
          <div
            style={{
              color: "white",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "90%",
              justifyContent: "space-around",
              marginTop: 15,
              border: "1px solid white",
              padding: 7,
            }}
          >
            {geoData && (
              <>
                <span
                  style={{
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  City :<span className="App-link">{geoData.ip?.city}</span>
                </span>
                <span
                  style={{
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  Country :
                  <span className="App-link">{geoData.ip?.country}</span>
                </span>
                <span
                  style={{
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  isp :<span className="App-link">{geoData.ip?.asn}</span>
                </span>
                <span
                  style={{
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  Country Code:
                  <span className="App-link">{geoData.ip?.country_code}</span>
                </span>

                <span
                  style={{
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  IP :<span className="App-link">{geoData.ip?.ip}</span>
                </span>
              </>
            )}
          </div>
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default AnalyticsProvider;
